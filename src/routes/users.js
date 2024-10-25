import express from 'express'
import usersController from '../controllers/users.js'

const router = express.Router()

router.get('/', passport.authenticate('local'), usersController.getItems )

export default router