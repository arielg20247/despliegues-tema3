const mongoose = require('mongoose');

let usuariSchema = new mongoose.Schema({
    login: {
    type: String,
    require: true,
    minlength: 5,
    unique:true
  },
  password: {
    type: String,
    minlength: 5,
    require: true,
  },
});

let usuari = mongoose.model('usuari', usuariSchema);

module.exports = usuari;
