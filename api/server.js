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
const Observation = require("./src/models/Observation");

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

// User registration
app.post("/users/signup", async (request, response) => {
  const userToSave = {
    id: uuid(),
    prenom: request.body.prenom,
    nom: request.body.prenom,
    email: request.body.email,
    password: request.body.password,
    role: request.body.role ? request.body.role : "Élève"
    // ecole: request.body.school,
  };
  try {
    if (
      validator.isEmail(userToSave.email)
      //  && validator.isStrongPassword(userToSave.password)
    ) {
      // Check to see if the user already exists. If not, then create it.
      const user = await User.findOne({ email: userToSave.email });
      if (user) {
        const msg =
          "Un compte est déjà inscrit avec cet email: " + userToSave.email;
        console.log(msg);
        response.send({ success: false, msg: msg });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(
          userToSave.password,
          saltRounds
        );
        userToSave.password = hashedPassword;
        const savedUser = await User.create(userToSave);
        const msg = "Compte créé avec succès";
        response.send({
          success: true,
          msg: msg,
          data: savedUser,
        });
        return;
      }
    }
  } catch (error) {
    console.log("Database error: " + error.message);
    response.send({ success: false, msg: error.message });

  }
});

// User login
app.post("/users/signin", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  try {
    if (email && password) {
      // Check to see if the user already exists. If not, then create it.
      const user = await User.findOne({ email: email });
      if (!user) {
        const msg = "Email invalide: " + email;
        console.log(msg);
        response.send({ success: false, msg: msg });
        return;
      } else {
        const isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
          const msg = "Authentification réussi";
          console.log(msg);
          response.send({ success: true, msg: msg, data: user });
          return;
        } else {
          const msg = "Mot de passe erroné";
          console.log(msg);
          response.send({ success: false, msg: msg });
          return;
        }
      }
    }
  } catch (error) {
    console.log("Database error: " + error.message);
    response.send({ success: false, msg: error.message });
  }
});

// Get all users
app.get("/users", async (request, response) => {
  try {
    const users = await User.find();
    response.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all teachers
app.get("/users/students", async (request, response) => {
  try {
    const users = await User.find({ role: "Enseignant" });
    response.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all students
app.get("/users/teachers", async (request, response) => {
  try {
    const users = await User.find({ role: "Élève" });
    response.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all students
app.get("/users/admin", async (request, response) => {
  try {
    const users = await User.find({ role: "Élève" });
    response.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

// Get a User by email
app.post("/users", async (request, response) => {
  const email = request.body.email;
  try {
    const user = await User.findOne({ email: email });
    response.send(user);
  } catch (error) {
    console.log(error.message);
  }
});


app.post("/observations", async (request, response) => {

  try {
    const user = await User.findOne({ email: email });
    response.send(user);
  } catch (error) {
    console.log(error.message);
  }
});


app.listen(port, () =>
  console.log(`GIS app listening on port ${port}!`)
);
