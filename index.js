const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

let app = express();

mongoose.connect('mongodb://localhost:27017/filmes', { useNewUrlParser: true });

const public = require('./routes/public');
const pelicules = require('./routes/pelicules');
const auth = require('./routes/auth');


app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false
}));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.use("/", public);
app.use("/pelicules", pelicules);
app.use("/login", auth);


app.listen(8080);