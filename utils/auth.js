let autentificacio = (req, res, next) => {
    if (req.session && req.session.usuari)
    return next();
    else
    res.render('auth_login');
   };

module.exports = autentificacio;