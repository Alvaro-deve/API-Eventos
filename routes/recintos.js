import express from 'express';

import Recinto from '../models/recinto.js';

const router = express.Router();



router.get('/', async (req, res) => {

    try {
        const resultado = await Recinto.find();

        if (resultado.length === 0) {
            return res.status(500).send({ ok: false, message: "No se han encontrado recintos" });
        }

        res.status(200).send( {ok: true, resultado: resultado});
    } catch (error) {
        res.status(500).send({ok: false, message: "Error obteniendo recintos"});
    }
});

router.get('/:id', async(req, res) => {

    try{
        const resultado = await Recinto.findById(req.params.id)

        if (!resultado) {
            return res.status(404).send({
                ok: false,
                message: `Recinto ${req.params.id} no encontrado`
            });
        }

        res.status(200).send({ok: true, resultado: resultado});
   
    } catch(error) {


        res.status(500).send({ok: false, error: "Error obteniendo el recinto, " + error});
    }
});


router.get('/localidad/:nombre', async (req,res) => {


    try{

        const resultado = await Recinto.find({localidad: req.params.nombre})

        if(!resultado)
            return res.status(404).send({ok: false, error: "No se han encontrado recintos con la localidad indicada."})

        res.status(200).send({ ok: true, resultado: resultado})


    }catch(error){
        res.status(500).send({ok: false, error: "Error obteniendo el recinto," + error});
    }



})

router.post('/', async (req,res) => {

    
    let nuevoRecinto = new Recinto(req.body)

    try{
    const resultado = await nuevoRecinto.save();

    res.status(201).send({ok: true, resultado: nuevoRecinto})
    }catch(error){
        res.status(201).send({ok: false, error: error})
    }




})

router.put('/:id', async (req, res) => {

    try{
        const resultado = await Recinto.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!resultado)
            return res.status(404).send({ok: false, error: `Error actualizando recinto ${req.params.id}`});

        res.status(200).send({ok: true, resultado: resultado});

    }catch(error){
        res.status(404).send({ok: false, error: `Error actualizando recinto ${req.params.id}`});
    }

})

router.delete('/:id', async (req,res) => {

const recinto = Recinto.findById(req.params.id);

if(!recinto)
{
    res.status(404).send({ok:false, error: "No se ha encontrao este:" + req.params.id})
} else {
    Recinto.delete({id: req.params.id})
    res.status(200).send({ok: true, resultado: recinto})
}


})

export default router;
