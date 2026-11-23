
import express from 'express';
import Evento from '../models/evento.js';


const router = express.Router();



router.get('/', async(req, res) => {

    try{
        const resultado = await Evento.find().populate('recinto');

        if(resultado.length === 0)
            return res.status(500).send({ok: false, error: "No se han encontrado eventos"});

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(500).send({ok: false, error: "No se han encontrado eventos"});
    }

})


router.get('/:id', async(req, res) => {

    try{
        const resultado = await Evento.findById(req.params.id).populate('recinto');

        if(!resultado)
            return res.status(404).send({ok: false, error: `Evento ${req.params.id} no encontrado`});

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(404).send({ok: false, error: `Evento ${req.params.id} no encontrado`});
    }

})


router.get('/localidad/:nombre', async(req, res) => {

    try{
        const resultado = await Evento.find({fecha: {$gte: new Date()}}).populate({
            path: 'recinto',
            match: {localidad: req.params.nombre}
        });

        const filtrado = resultado.filter(evento => evento.recinto !== null);

        if(filtrado.length === 0)
            return res.status(404).send({ok: false, error: "No se han encontrado eventos"});

        res.status(200).send({ok: true, resultado: filtrado});

    }catch(error){
        res.status(404).send({ok: false, error: "No se han encontrado eventos"});
    }

})


router.post('/', async(req, res) => {

    let nuevoEvento = new Evento(req.body);

    try{
        const resultado = await nuevoEvento.save();

        res.status(201).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(500).send({ok: false, error: "Error añadiendo evento"});
    }

})


router.put('/:id', async(req, res) => {

    try{
        const resultado = await Evento.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!resultado)
            return res.status(404).send({ok: false, error: `Error actualizando evento ${req.params.id}`});

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(404).send({ok: false, error: `Error actualizando evento ${req.params.id}`});
    }

})


router.delete('/:id', async(req, res) => {

    try{
        const resultado = await Evento.findByIdAndDelete(req.params.id);

        if(!resultado)
            return res.status(404).send({ok: false, error: `Error eliminando evento ${req.params.id}`});

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(404).send({ok: false, error: `Error eliminando evento ${req.params.id}`});
    }

})


router.get('/entradas/:idEvento/:tipoEntrada', async(req, res) => {

    try{
        const evento = await Evento.findById(req.params.idEvento);

        if(!evento)
            return res.status(404).send({ok: false, error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`});

        const entrada = evento.entradas.find(e => e.tipo === req.params.tipoEntrada);

        if(!entrada)
            return res.status(404).send({ok: false, error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`});

        res.status(200).send({ok: true, resultado: {precio: entrada.precio, disponibles: entrada.disponible}});

    }catch(error){
        res.status(404).send({ok: false, error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`});
    }

})


router.put('/entradas/:idEvento/:tipoEntrada/:cantidad', async(req, res) => {

    try{
        const evento = await Evento.findById(req.params.idEvento);

        if(!evento)
            return res.status(404).send({ok: false, error: `Error actualizando entradas del evento ${req.params.idEvento}`});

        const entrada = evento.entradas.find(e => e.tipo === req.params.tipoEntrada);

        if(!entrada || entrada.disponible < parseInt(req.params.cantidad))
            return res.status(404).send({ok: false, error: `Error actualizando entradas del evento ${req.params.idEvento}`});

        entrada.disponible -= parseInt(req.params.cantidad);

        const resultado = await evento.save();

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(404).send({ok: false, error: `Error actualizando entradas del evento ${req.params.idEvento}`});
    }

})

router.get('/recinto/:id', async(req,res) => {

    try{
    const id = req.params.id;
    const resultado = await Evento.find({recinto: id} );
    if(!resultado)
    {
        return res.status(404).send({ok: false, error: "Puta madre coño"});
    } else return res.status(200).send({ok: true, resultado: resultado});
    }catch(error){
        return res.status(500).res.send({ok: false, error: "eror base de datos"});
    }
    








})

export default router;
