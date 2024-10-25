import express from 'express'
import notesController from '../controllers/notes.js'

const router = express.Router()


console.log('archivo router NOTES')

//***************LISTADO DE NOTAS***************
router.get('/', notesController.getItems )

//***************FORMULARIO DE NUEVA NOTA***************
router.get('/new', (req, res) => {
	res.render('notes/note.hbs')
})

//***************GUARDO LA NUEVA NOTA***************
router.post('/new_save', (req, res) => {
	console.log('grabar nueva nota')
	notesController.new_save(req, res)
})

//***************FORMULARIO editar NOTA***************
router.get('/edit/:id', (req, res) => {
	notesController.edit(req, res)
})

//***************FORMULARIO UPDATE NOTA***************
router.put('/edit_save/:id', (req, res) => {
	notesController.edit_save(req, res)
})

//***************FORMULARIO DELETE NOTA***************
router.delete('/remove/:id', (req, res) => {
	console.log('note router remove')
	notesController.remove(req, res)
})

export default router