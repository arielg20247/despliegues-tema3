const express = require('express');
const CryptoJS = require("crypto-js");

let router = express.Router();
let usuari = require(__dirname + "/../models/usuari.js");

let passwordToHash = (password) =>{
    return CryptoJS.SHA256(password).toString();
}

router.get("/", (req, res) => {
    res.render("auth_login");
});

router.post("/", (req, res) => {
    usuari.find({ login: req.body.login, password: passwordToHash(req.body.password) }).then(result => {
        if (result.length > 0) {
            req.session.usuari = result[0].login;
            res.redirect('/pelicules');
        }
        else
            res.render("auth_login", { error: "Usuari incorrecte" });
    }).catch(error => {
        res.render("auth_login", { error: "Error en l'aplicació" });
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;