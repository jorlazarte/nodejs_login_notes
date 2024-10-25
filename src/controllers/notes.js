//import noteModel from '../models/notes.js'
import noteDB from '../db/mongo/note.js'

const getItems = async (req, res) => {
    
    console.log('controllerNOTE.getItems')
    
    const notes = await noteDB.getItems()
    console.log(notes)
    if(notes.msg == 'ok'){
        res.render('notes/list.hbs', {notes: notes.notes} )
    }else{

    }    
}

const new_save = async (req, res) => {
    
    console.log('controllerNOTE.new_save')
    
    const newNote = await noteDB.new_save(req, res)
    console.log('__vuelve de db cMsg', newNote)
    
    if(newNote.msg == 'ok'){
        req.flash('success_msg', 'NOTA CREADA CORRECTAMENTE')
    }else{
        req.flash('success_msg', 'NOTA NO CREADA CORRECTAMENTE')
    }
    
    res.redirect('/notes')
    
}

const edit = async (req, res) => {
    
    console.log('controladorNOTE.edit')
    //const idNote = 'FDJAFNDJKSNAFJDKANFJDSKA' //req.params.id
    
    const idNote = req.params.id
    console.log('id', idNote)
    
    const oNote = await noteDB.edit(idNote)
    console.log('oNote', oNote)
    if (oNote.msg == 'error') {
        req.flash('success_msg', 'NOTA NO ENCONTRADA')
        res.redirect('/notes')
    }
    
    console.log('controller return object', oNote)
    console.log('title: ', oNote.title)
    
    res.render('notes/note.hbs', oNote )
    
}

const edit_save = async (req, res) => {
    console.log('controladorNOTE.edit_save')
    
    const { title, description } = req.body
    const idNote = req.params.id
    const note = {title: title, description: description}
    console.log('updateItem titletitle', title)
    
    const oNote = await noteDB.edit_save( idNote, note)
    console.log('oNote edit', oNote)
    req.flash('success_msg', 'NOTA MODIFICADA CORRECTAMENTE')
    res.redirect('/notes')
}

const remove = async (req, res) => {
    console.log('controladorNOTE.remove')
    
    const idNote = req.params.id
    console.log('remove id', idNote)
    

    const noteRemove = await noteDB.remove( idNote )
    console.log('oNote remove', noteRemove)

    req.flash('success_msg', 'NOTA eliminada CORRECTAMENTE')
    res.redirect('/notes')
}

const notesController = {
    getItems,
    new_save,
    edit,
    edit_save,
    remove
}

export default notesController;