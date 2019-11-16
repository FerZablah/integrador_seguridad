const dispositivoSchema = require('../models/dispositivo.js');
const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const joi = require('@hapi/joi');

router.post('/', async (req, res) => { 
    try {
        const {error} = joi.validate(req.body, dispositivoSchema.schema);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        } 
        await db.procedures.insertDispositivo(req.body.idDispositivo, req.body.uid);
        res.send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.get('/:uid', async (req, res) => { 
    try {
        if(!req.params.uid){
            console.log('error, no UID received');
            return res.status(400).send();
        } 
        const dispositivos = await db.procedures.getDispositivos(req.params.uid);
        res.send(dispositivos);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.delete('/:id', async (req, res) => { 
    try {
        if(!req.params.id){
            console.log('error, no id received');
            return res.status(400).send();
        } 
        await db.procedures.deleteDispositivo(req.params.id);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = router;