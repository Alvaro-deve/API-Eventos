import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import eventos from './routes/eventos.js';
import recintos from './routes/recintos.js';

let app = express();

app.use(express.json());
app.use('/eventos', eventos);
app.use('/recintos', recintos);

const puerto = process.env.PORT || 3000;
app.listen(puerto);

async function conectarDB() {
    try {
   
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a la base de datos Atlas");
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
}
conectarDB();
