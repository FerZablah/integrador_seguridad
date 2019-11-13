const contactoSchema = require('../models/contacto.js');
const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const joi = require('@hapi/joi');

router.get('/:uid', async (req, res) => { 
    try {    
        if(!req.params.uid){
            return res.status(400).send('No phone received');
        }
        await db.procedures.getContactos(req.params.uid);
        return res.send();
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/', async (req, res) => { 
    try {    
        const {error} = joi.validate(req.body, contactoSchema.schema.post);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        }
        await db.procedures.insertContacto(req.body.phone, req.body.name, req.body.uid);
        return res.send();
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/', async (req, res) => { 
    try {    
        const {error} = joi.validate(req.body, contactoSchema.schema.put);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        }
        await db.procedures.updateContacto(req.body.old_phone, req.body.phone, req.body.name);
        return res.send();
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.delete('/:phone', async (req, res) => { 
    try {    
        if(!req.params.phone){
            return res.status(400).send('No phone received');
        }
        await db.procedures.deleteContacto(req.params.phone);
        return res.send();
    } catch (error) {
        return res.status(400).send(error);
    }
});