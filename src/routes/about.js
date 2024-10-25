import express from 'express'
import usersController from '../controllers/users.js'

const router = express.Router()

router.get('/', (req, res) => {
	res.render('about', {
    	title: 'Mi aplicación con Handlebars'
  	})
} )

export default router