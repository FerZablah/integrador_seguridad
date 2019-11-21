const audioSchema = require('../models/audio.js');
const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const moment = require('moment');
const joi = require('@hapi/joi');

router.post('/', async (req, res) => { 
    try {
        const {error} = joi.validate(req.body, audioSchema.schema);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        } 
        let insertAudio = new Promise((resolve, rej) => {
            db.procedures.insertAudio(req.body.idEvento, new moment.utc(), req.body.liga).then(() => {
                resolve();
            });
        });
        await Promise.all([insertAudio]);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = router;