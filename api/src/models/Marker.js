const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   // unique: true,
    // },
    userId: {
      type: mongoose.ObjectId,
      ref: "User"
    },
    latlng: {
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
    sourcesDeContamination: {
      type: String,
      enum: [
        "Pollution près ou dans le cours d'eau",
        "Résidences à proximité ou routes",
        "Pollution d'origine industrielle",
        "Pollution d'origine agricole",
      ]
    },
    resultats: {
      macroinvertebres: [{
        type: String
      }],
      microorganismes: {
        bacteries: String,
        protistes: String,
        archees: String
      },
      poissons: [{
        type: String
      }],
      decouverteCocasses: [{
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
