const express = require('express');
let router = express.Router();

let pelicula = require("../models/pelicula");

router.get("/", (req, res) => {
  pelicula.find().then(() => {
    res.render("public_index");
  }).catch((error) => {
    res.render("public_error", { Error: "Error en l'aplicació" });
  });
});

router.get("/buscar", (req, res) => {
  pelicula.find().then((result) => {
    let peliculesNomFilter = result.filter(pelicula => pelicula.titol.toLowerCase().includes(req.query.titol.toLowerCase()));
    if (peliculesNomFilter.length > 0) {
      res.render("public_index", { pelicules: peliculesNomFilter });
    }
    else {
      res.render("public_error", { error: "No es van trobar pel·lícules" });
    }
  }).catch((error) => {
    res.render("public_error", { error: "Error en l'aplicació" });
  });
});

router.get("/pelicula/:id", (req, res) => {
  pelicula.findById(req.params.id).populate("director").then((result) => {
    res.render("public_pelicula", { pelicula: result });
  }).catch((error) => {
    res.render("public_error", { error: "Error en l'aplicació" });
  });
});

module.exports = router;
