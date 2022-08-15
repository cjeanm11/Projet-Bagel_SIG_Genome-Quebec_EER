const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

class UsersService {
  constructor() { }

  async getUsers() {
    return await User.find();
  }

  async getUser(id) {
    return await User.findById(req.params.id);
  }

  async getStudents() {
    return await User.find({ role: "Élève" });
  }

  async getTeachers() {
    return await User.find({ role: "Enseignant" });
  }

  async getAdmins() {
    return await User.find({ role: "admin" });
  }

  async signUpUser(userToSignUp) {
    // Vérifier que le mot de passe est assez fort et que l'identifiant est assez long
    // if (userToSignUp.identifiant.length < 6 || !validator.isStrongPassword(userToSignUp.motDePasse))
    //   throw Error("Identifiant ou mot de passe invalide");

    // Vérifier que l'identifiant n'est pas déjà utilisé
    const user = await User.findOne({ identifiant: userToSignUp.identifiant });
    if (user) throw Error("Un compte est déjà inscrit avec cet identifiant: " + userToSignUp.identifiant);

    // Encrypter le mot de passe
    userToSignUp.motDePasse = await bcrypt.hash(
      userToSignUp.motDePasse,
      10
    );
    return await User.create(userToSignUp);
  }

  async signInUser(identifiant, motDePasse) {
    // Vérifier que l'utilisateur existe
    const user = await User.findOne({ identifiant: identifiant });
    if (!user) throw Error("Identifiant invalide: " + identifiant);
    
    // Vérifier que le mode de passe est correct
    const isSame = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isSame) throw Error("Mot de passe erroné");

    return user;
  }

  async updateUser(userToUpdate) {
    // Vérifier que l'utilisateur existe
    const user = await User.findOne({ identifiant: userToUpdate.identifiant });
    if (!user) throw Error("Identifiant invalide: " + userToUpdate.identifiant);

    // Vérifier que le mode de passe est correct
    const isSame = await bcrypt.compare(userToUpdate.motDePasse, user.motDePasse);
    if (!isSame) throw Error("Mot de passe erroné");

    // Encrypter le mot de passe
    userToUpdate.motDePasse = await bcrypt.hash(
      userToUpdate.nouveauMotDePasse || userToUpdate.motDePasse,
      10
    );
    return await User.findOneAndReplace({ _id: userToUpdate._id }, userToUpdate);
  }

  async deleteUser(id) {
    await User.findByIdAndRemove(id);
  }
}

module.exports = UsersService
