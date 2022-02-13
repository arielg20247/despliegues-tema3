const mongoose = require('mongoose');
const director = require('../models/director');

mongoose.connect("mongodb://localhost:27017/filmes");

let director1 = new director({ 
    nom: 'director1', 
    naixement: "2000-07-07"
}); 
director1.save(); 
 
let director2 = new director({ 
    nom: 'director2', 
    naixement: "2002-07-07"
}); 
director2.save();