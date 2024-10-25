import mongoose from 'mongoose';

// Definir el esquema para las notas
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [3, 'El título debe tener al menos 3 caracteres']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        minlength: [3, 'La descripción debe tener al menos 3 caracteres']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crear y exportar el modelo
const noteModel = mongoose.model('Note', noteSchema);

export default noteModel;