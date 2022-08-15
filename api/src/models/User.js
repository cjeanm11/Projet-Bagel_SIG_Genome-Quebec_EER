const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   // unique: true
    // },
    prenom: {
      type: String,
      required: true
    },
    nom: {
      type: String,
      required: true
    },
    identifiant: {
      type: String,
      required: true,
      unique: true
    },
    motDePasse: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["Admin", "Enseignant", "Élève"],
      required: true,
      default: "Élève"
    },
    ecole: String,
    centreDeServiceScolaire: String,
    niveauScolaire: String
  },
  {
    timestamps: true
  },
  {
    collection: "users"
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
