const mongoose = require("mongoose");
const User = require("./User");

const MarkerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: 'User'
    },
    coordonnees: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
    },
    coursDeau: String,
    dateDechantillonage: {
      // YYYY-MM-DD format
      type: Date,
      // required: true
    },
    ciel: {
      type: String,
      enum: ["Pluvieux", "Nuageux", "Ensoleillé avec nuages", "Ensoleillé"]
    },
    berges: {
      type: String,
      enum: ["Sablonneuses", "Rocailleuses", "Herbeuses", "Végétalisées"]
    },
    couleurDeau: {
      type: String,
      enum: [
        "Brune",
        "Jaune",
        "Boueuse / Avec sédiments",
        "Claire / Transparente"
      ],
    },
    fondDeau: {
      type: String,
      enum: [
        "Gravier",
        "Sable",
        "Vase / Argile / Boue / Glaise",
        "Je ne vois pas le fond du cours d'eau"
      ],
    },
    quantiteDalgues: {
      type: String,
      enum: ["Très faible", "Faible", "Moyenne", "Importante"]
    },
    sourcesDeContamination: [{
      type: String
    }],
    resultats: {
      disponibles: {
        type: Boolean,
        required: true,
        default: false
      },
      macroinvertebres: [{
        type: String
      }],
      microorganismes: {
        bacteries: {
          type: String
        },
        protistes: {
          type: String
        },
        archees: {
          type: String
        }
      },
      poissons: [{
        type: String
      }],
      decouvertesCocasses: [{
        type: String
      }]
    }
  },
  {
    timestamps: true
  },
  {
    collection: "markers"
  }
);

const Marker = mongoose.model("Marker", MarkerSchema);

module.exports = Marker;
