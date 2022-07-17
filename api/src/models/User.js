const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      // unique: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Enseignant", "Élève"],
      required: true,
    },
    ecole: String,
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
