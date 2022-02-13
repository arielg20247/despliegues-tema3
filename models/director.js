const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true,
        minlength: 5,
    },
    naixement: {
        type: Date,
    },
});

let director = mongoose.model('director', directorSchema);

module.exports = director;
