const express = require('express');
const multer = require('multer')
const autentificacio = require('../utils/auth')
let router = express.Router();

let pelicula = require("../models/pelicula");
let director = require("../models/director");


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
})

let upload = multer({ storage: storage });

router.get("/",autentificacio, (req, res) => {
  pelicula.find().then((result) => {
    res.render("admin_pelicules", { pelicules: result });
  }).catch((error) => {
    res.render("admin_error", { error: "Error en l'aplicació" });
  });
});

router.get("/nova",autentificacio, (req, res) => {
  director.find().then((result) => {
    res.render("admin_pelicules_form", { directors: result });
  }).catch((error) => {
    res.render("admin_error", { error: "Error en l'aplicació" });
  });
});

router.get("/editar/:id",autentificacio, (req, res) => {
  director.find().then((result) => {
    let director = result;
    pelicula.findById(req.params.id).then((result) => {
        res.render("admin_pelicules_form", { pelicula: result, directors: director });
      })
      .catch(() => {
        res.render("admin_error", { error: "Pel·lícula no trobada"});
      });
  }).catch((error) => {
    res.render("admin_error", { error: "Error en l'aplicació" });
  });
});

router.post("/", upload.single('imatge'),autentificacio, (req, res) => {
  let addPelicula = new pelicula({
    titol: req.body.titol,
    sinopsi: req.body.sinopsi,
    duracio: req.body.duracio,
    genere: req.body.genere,
    imatge: req.file.filename,
    valoracio: req.body.valoracio,
    plataforma: { nom: req.body.plataforma, data: req.body.data, abon: req.body.abon },
    director: req.body.director,
  });
  addPelicula
    .save()
    .then(() => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      res.render("admin_error", { error: "Error en l'aplicació" });
    });
});

router.post("/:id", upload.single('imatge'), autentificacio,(req, res) => {
  if (req.file)
  {
    pelicula.findByIdAndUpdate(req.params.id,{
      titol: req.body.titol,
      sinopsi: req.body.sinopsi,
      duracio: req.body.duracio,
      genere: req.body.genere,
      imatge: req.file.filename,
      valoracio: req.body.valoracio,
      plataforma: { nom: req.body.plataforma, data: req.body.data, abon: req.body.abon },
      director: req.body.director,
    }, {new: true}).then(() => {
        res.redirect(req.baseUrl);
      })
      .catch((error) => {
        res.render("admin_error", { error: "Error en l'aplicació" });
      });
  }
  else{
    pelicula.findByIdAndUpdate(req.params.id,{
      titol: req.body.titol,
      sinopsi: req.body.sinopsi,
      duracio: req.body.duracio,
      genere: req.body.genere,
      valoracio: req.body.valoracio,
      plataforma: { nom: req.body.plataforma, data: req.body.data, abon: req.body.abon },
      director: req.body.director,
    }, {new: true}).then(() => {
        res.redirect(req.baseUrl);
      })
      .catch((error) => {
        res.render("admin_error", { error: "Error en l'aplicació" });
      });
  }
});

router.delete("/:id", autentificacio,(req, res) => {
  pelicula.findByIdAndRemove(req.params.id).then(() => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      res.render("admin_error", { error: "Error en l'aplicació" });
    });
});

module.exports = router;