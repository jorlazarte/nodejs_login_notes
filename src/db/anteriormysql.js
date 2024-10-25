import noteModel from '../models/notes.js'

/**************************************NOTAS***********************************/
/**************************************NOTAS***********************************/
/**************************************NOTAS***********************************/
const getItems = async (req, res) => {
    console.log('dbNOTE.getItems')
    const notes = await noteModel.find().lean().sort({createdAt: 'desc'})
    //return res.send({ data })

    const noteObj = {msg: "ok", notes}
    console.log('db.notes', notes)
    //console.log('titulo', notes[0].title)
    return noteObj
}

const new_save = async (req, res) => {
    console.log('dbNOTE.createItem')
    const { title, description } = req.body

    try {
        //console.log('1111')
        // Crear una nueva nota
        const newNote = new noteModel({ title, description })
        //console.log('222222')

        // Guardar la nota en la base de datos
        const newNoteSave = await newNote.save()
		console.log('newNote', newNoteSave)
		//req.flash('success_msg', 'NOTA GENERADA CORRECTAMENTE')
        
        return {msg: "ok", newNote}
    } catch (error) {
        // Si hay un error de validación, Mongoose lo capturará aquí
        //res.status(400).json({ error: error.message });
        //console.log(error.errors['title'].message)
        console.log('title__', title)

        return {msg: "error"}
        //const err = error.errors
        //res.render('notes/new.hbs', { error: err, title: title, description: description })
    }
}

const edit = async (idNote) => {
    console.log('***************db.editItem**************')
    //const idNote = req.params.id
    
    try {
        console.log('__try', idNote)
        const noteEdit = await noteModel.findById(idNote).lean()
        console.log('__note', noteEdit)
        return noteEdit
    } catch (error) {
        return {msg: "error"}
    }
}

const edit_save = async (idNote, oNote) => {
    
    try {
        
        const noteEdit = await noteModel.findByIdAndUpdate( idNote, oNote )
        return {msg: "ok", noteEdit}
        
    } catch (error) {
    	req.flash('success_msg', 'NOTA no MODIFICADA CORRECTAMENTE')
        return {msg: "error", error}
        //res.render('notes/new.hbs', { error: err, title: title, description: description })
    }
    
}

const remove = async (idNote) => {
    console.log('mongodb.remove', idNote)
    
    try {
        const noteRemove = await noteModel.findByIdAndDelete(idNote)
        return {msg: "ok", noteRemove}
        
    } catch (error) {
        req.flash('success_msg', 'NOTA no eliminada CORRECTAMENTE')
        return {msg: "error", error}
    }

}

const notesDB = {
    getItems ,
    new_save,
    edit,
    edit_save,
    remove
}

export default notesDB;