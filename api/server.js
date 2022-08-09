const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuid } = require("uuid");
require("dotenv").config({ path: __dirname + "/config/.env" });
const User = require("./src/models/User");
const Marker = require("./src/models/Marker");
// const Result = require("./src/models/Result");

const app = express();
const port = 5000;
const url =
  "mongodb+srv://root:" +
  process.env.MONGODB_PWD +
  "@cluster0.0qjvtyf.mongodb.net/GIS_App?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());
// Allows express to read a request body
app.use(express.json());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User sign up
app.post("/users/signup", async (req, res) => {
  // const userToSave = req.body.user;
  const userToSave = {
    // id: uuid(),
    prenom: req.body.prenom,
    nom: req.body.prenom,
    identifiant: req.body.identifiant,
    motDePasse: req.body.motDePasse,
    role: req.body.role ? req.body.role : "Élève"
    // ecole: req.body.school,
  };
  try {
    if (true
      //  validator.isStrongPassword(userToSave.motDePasse)
    ) {
      // Vérifier que l'identifiant n'est pas déjà utilisé
      const user = await User.findOne({ identifiant: userToSave.identifiant });
      if (user) {
        const msg =
          "Un compte est déjà inscrit avec cet identifiant: " + userToSave.identifiant;
        console.log(msg);
        res.status(400).send({ success: false, msg: msg });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(
          userToSave.motDePasse,
          10
        );
        userToSave.password = hashedPassword;
        const savedUser = await User.create(userToSave);
        res.status(200).send({
          success: true,
          msg: "Compte créé avec succès",
          data: savedUser,
        });
      }
    }
    else {
      // identifiant ou mot de passe invalide
      res.status(400).send({ success: false, msg: "Identifiant ou mot de passe invalide" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// User sign in
app.post("/users/signin", async (req, res) => {
  const identifiant = req.body.identifiant;
  const motDePasse = req.body.motDePasse;
  try {
    if (identifiant && motDePasse) {
      // Check to see if the user already exists. If not, then create it.
      const user = await User.findOne({ identifiant: identifiant });
      if (!user) {
        const msg = "Identifiant invalide: " + identifiant;
        console.log(msg);
        res.status(400).send({ success: false, msg: msg });
        return;
      } else {
        const isSame = await bcrypt.compare(motDePasse, user.motDePasse);
        if (isSame) {
          const msg = "Authentification réussi";
          console.log(msg);
          res.status(200).send({ success: true, msg: msg, data: user });
          return;
        } else {
          const msg = "Mot de passe erroné";
          console.log(msg);
          res.status(400).send({ success: false, msg: msg });
          return;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get all students
app.get("/users/students", async (req, res) => {
  try {
    const students = await User.find({ role: "Élève" });
    res.status(200).send({ success: true, data: students });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get all teachers
app.get("/users/teachers", async (req, res) => {
  try {
    const teachers = await User.find({ role: "Enseignant" });
    res.status(200).send({ success: true, data: teachers });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get all admins
app.get("/users/admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).send({ success: true, data: admins });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get a User by id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Update a User by id
app.put("/users/:id", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );
    // const user = await User.findOneAndReplace({ _id: req.params.id }, req.body.user)
    const user = await User.findById(req.params.id);
    user.prenom = req.body.prenom;
    user.nom = req.body.prenom;
    user.identifiant = req.body.identifiant;
    user.password = hashedPassword;
    user.role = req.body.role ? req.body.role : "Élève";
    const savedUser = await user.save();
    res.status(200).send({
      success: true,
      msg: "Compte mis à jour avec succès",
      data: savedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Delete a User by id
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Get all markers
app.get("/map/markers", async (req, res) => {
  try {
    const markers = await Marker.find();
    res.status(200).send({ success: true, data: markers });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Add a marker
app.post("/map/markers", (req, res) => {
  try {
    const markerToSave = req.body.marker;
    const savedMarker = await Marker.create(markerToSave);
    res.status(200).send(savedMarker);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Update a marker by id
app.put("/map/markers/:id", (req, res) => {
  try {
    const savedMarker = await Marker.findOneAndReplace({ _id: req.params.id }, req.body.marker)
    res.status(200).send(savedMarker);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

// Delete a marker by id
app.delete("/map/markers/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

app.listen(port, () =>
  console.log(`GIS app listening on port ${port}!`)
);