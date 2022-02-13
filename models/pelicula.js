const mongoose = require('mongoose');

const modelDirector = require("./director");

let prataformaSchema = new mongoose.Schema({
  nom: {
    type: String,
    require: true,
    minlength: 2,
  },
  data: {
    type: Date,
  },
  abon: {
    type: Boolean,
    default: false,
  },
});

let peliculaSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true,
    minlength: 2,
  },
  sinopsi: {
    type: String,
    required: true,
    minlength: 10,
  },
  duracio: {
    type: Number,
    required: true,
    min: 0,
  },
  genere: {
    type: String,
    require: true,
  },
  imatge: {
    type: String,
  },
  valoracio: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
  plataforma: prataformaSchema,
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director'
  },
});

let pelicula = mongoose.model('pelicula', peliculaSchema);
module.exports = pelicula;
