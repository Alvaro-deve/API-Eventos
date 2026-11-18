
import mongoose from 'mongoose';

const recintoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        minlength: 5
    },
    direccion:{
        type: String,
        required: true,
        minlength: 10
    },
    localidad:{
        type: String,
        required: true,
        minlength: 3
    },
    aforoMaximo:{
        type: Number,
        min: 0
    }
});

export default mongoose.model('Recinto', recintoSchema);