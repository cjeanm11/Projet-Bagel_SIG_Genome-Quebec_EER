class UsersService {
  constructor() { }

  getUsers = (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send({ success: true, data: users });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  getUser = (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send({ success: true, data: user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  getStudents = (req, res) => {
    try {
      const students = await User.find({ role: "Élève" });
      res.status(200).send({ success: true, data: students });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  // getPendingStudents = (req, res) => {
  //   return null;
  // }

  getTeachers = (req, res) => {
    try {
      const teachers = await User.find({ role: "Enseignant" });
      res.status(200).send({ success: true, data: teachers });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  // getPendingTeachers = (req, res) => {
  //   return null;
  // }

  getAdmins = (req, res) => {
    try {
      const admins = await User.find({ role: "admin" });
      res.status(200).send({ success: true, data: admins });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }  }

  signUpUser = (req, res) => {
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
    }  }

  signInUser = (req, res) => {
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
    }  }

  updateUser = (req, res) => {
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
    }  }
  
  deleteUser = (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }  }
}

module.exports = UsersService
