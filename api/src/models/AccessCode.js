const mongoose = require("mongoose");

const AccessCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["Admin", "Enseignant", "Élève"],
      required: true,
      default: "Élève"
    },
    ecole: String,
    centreDeServicesScolaire: String,
    niveauScolaire: String
  },
  {
    timestamps: true
  },
  {
    collection: "users"
  }
);

const AccessCode = mongoose.model("AccessCode", AccessCodeSchema);

module.exports = AccessCode;
