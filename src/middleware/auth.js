function userAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Si el usuario está autenticado, continúa con la siguiente función en la ruta
    }
    res.redirect('/login'); // Si no está autenticado, redirige al login
}

const userAuth = {
    autenticado /*,
    loginUser ,
    edit,
    edit_save,
    remove*/
}

export default authMiddleware;