const bcrypt = require("bcrypt");
const User = require("../models/User");
const AccessCodesService = require("../services/accessCodes.service");

class UsersService {
  constructor() { }

  async getUsers() {
    return await User.find();
  }

  async getUser(id) {
    return await User.findById(id);
  }

  async getStudents(css, ecole, niveauScolaire) {
    return await User.find(
      {
        role: "Élève",
        centreDeServicesScolaire: css,
        ecole: ecole,
        niveauScolaire: niveauScolaire
      });
  }

  async getTeachers() {
    return await User.find({ role: "Enseignant" });
  }

  async getAdmins() {
    return await User.find({ role: "admin" });
  }

  async signUpUser(userToSignUp, accessCode) {

    // Vérifier que l'identifiant n'est pas déjà utilisé
    const user = await User.findOne({ identifiant: userToSignUp.identifiant });
    if (user) throw Error("Un compte est déjà inscrit avec cet identifiant: " + userToSignUp.identifiant);

    // Définir le rôle et la classe de l'usager
    const accessCodesService = new AccessCodesService()
    const accessCodeInfo = await accessCodesService.getAccessCodeInfo(accessCode);
    if (!accessCodeInfo) throw new Error("Le code d'accès est invalide");
    userToSignUp.role = accessCodeInfo.role;
    userToSignUp.ecole = accessCodeInfo.ecole;
    userToSignUp.centreDeServicesScolaire = accessCodeInfo.centreDeServicesScolaire;
    userToSignUp.niveauScolaire = accessCodeInfo.niveauScolaire;

    // Vérifier que le mot de passe et l'identifiant sont assez longs et ne contiennent pas d'espace
    if (userToSignUp.identifiant.length < 6)
      throw Error("L'identifiant doit avoir au minimum 6 caractères");
    if (userToSignUp.motDePasse.length < 8)
      throw Error("Le mot de passe doit avoir au minimum 8 caractères");
    if (userToSignUp.identifiant.includes(' ') || userToSignUp.motDePasse.includes(' '))
      throw Error("L'identifiant et le mot de passe ne peuvent pas contenir d'espace");
    // Vérifier que le mot de passe est sécuritaire pour les admins et les enseignants
    // if (["Admin", "Enseignant"].includes(userToSignUp.role) &&
    //   !validator.isStrongPassword(userToSignUp.motDePasse))
    //   throw Error("Le mot de passe doit contenir:\n" +
    //     "- 1 lettre minuscule\n" +
    //     "- 1 lettre majuscule\n" +
    //     "- 1 chiffre\n" +
    //     "- 1 symbole");

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
