import express from 'express'
import userController from '../controllers/user.js'

const router = express.Router()


console.log('archivo router login')

//***************LISTADO DE NOTAS***************
router.get('/', (req, res) => {
	res.render('login/login.hbs')
} )
router.post('/', userController.loginUser )

export default router