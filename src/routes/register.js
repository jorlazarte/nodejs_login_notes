import express from 'express'
import userController from '../controllers/user.js'

const router = express.Router()


console.log('archivo router register')

//***************FORMULARIO DE USUARIO NUEVA***************
router.get('/', (req, res) => {
	res.render('register/register.hbs')
})

router.post('/', (req, res) => {
	console.log('info register')
	userController.registerUser(req, res)
})

export default router