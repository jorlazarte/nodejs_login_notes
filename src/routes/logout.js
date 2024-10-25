import express from 'express'
import usersController from '../controllers/users.js'

const router = express.Router()

router.get('/', (req, res) => {
    req.logout((err) => {
        if (err) {
        	req.flash('success_msg', 'ERROR AL CERRAR LA SESION')
            res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
        }
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
    });

})

export default router