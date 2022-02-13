const mongoose = require('mongoose');
const usuario = require('../models/usuari');
const CryptoJS = require("crypto-js");

mongoose.connect("mongodb://localhost:27017/filmes");

let passwordToHash = (password) =>{
    return CryptoJS.SHA256(password).toString();
}

let user1 =  new usuario({
    login: "usuario1",
    password: passwordToHash("12345")
});
user1.save();

let user2 =  new usuario({
    login: "usuario2",
    password: passwordToHash("12345")
});

user2.save();

module.exports = passwordToHash;