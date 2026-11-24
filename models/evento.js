import mongoose from 'mongoose';
import Recinto from './recinto.js';

const entradaSchema = new mongodb.Schema({
    tipo: {
        type: String,
        required: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    disponible: {
        type: Number,
        required: true,
        min: 0
    }
});

const eventoSchema = new mongodb.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5,
    },
    fecha:{
        type: Date,
        required:true
        
    },
    entradas: [entradaSchema],
    recinto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recinto',
        required: true
    }
});



export default mongoose.model('Evento', eventoSchema);