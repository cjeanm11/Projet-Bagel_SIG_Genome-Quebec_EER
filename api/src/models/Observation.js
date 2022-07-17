const mongoose = require("mongoose");

const ObservationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      // unique: true,
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    coordonees: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    date: {
      // YYYY-MM-DD format
      type: Date,
      required: true,
    },
    ciel: {
      type: String,
      enum: ["Pluvieux", "Nuageux", "Ensoleillé avec nuages", "Ensoleillé"],
    },
    berges: {
      type: String,
      enum: ["Sablonneuses", "Rocailleuses", "Herbeuses", "Végétalisées"],
    },
    couleurDeau: {
      type: String,
      enum: [
        "Brune",
        "Jaune",
        "Boueuse / Avec sédiments",
        "Claire / Transparente",
      ],
    },
    fondDeau: {
      type: String,
      enum: [
        "Gravier",
        "Sable",
        "Vase / Argile / Boue / Glaise",
        "Je ne vois pas le fond du cours d'eau",
      ],
    },
    quantiteDalgues: {
      type: String,
      enum: ["Trés faible", "Faible", "Moyenne", "Importante"],
    },
    sourcesDeContamination: {
      type: String,
      enum: [
        "Pollution près ou dans le cours d'eau",
        "Résidences à proximité ou routes",
        "Pollution d'origine industrielle",
        "Pollution d'origine agricole",
      ],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "observations",
  }
);

const Observation = mongoose.model("Observation", ObservationSchema);

module.exports = Observation;
