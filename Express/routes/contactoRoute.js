const contactoSchema = require('../models/contacto.js');
const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const joi = require('@hapi/joi');

router.post('/', async (req, res) => { 
    try {    
        const {error} = joi.validate(req.body, contactoSchema.schema);
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

router.post('/', async (req, res) => { 
    try {    
        const {error} = joi.validate(req.body, contactoSchema.schema);
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
        const {error} = joi.validate(req.body, contactoSchema.schema);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        }
        await db.procedures.updateContacto(req.body.phone, req.body.name, req.body.uid);
        return res.send();
    } catch (error) {
        return res.status(400).send(error);
    }
});