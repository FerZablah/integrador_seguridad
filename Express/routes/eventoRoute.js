const audioSchema = require('../models/audio.js');
const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const moment = require('moment');

router.get('/:idEvento', async (req, res) => { 
    try {
        if(!req.params.idEvento){
            console.log('No idEvento received');
            return res.status(400).send('No idEvento received');
        } 
        let audios = [];
        let getAudios = new Promise((res, rej) => {
            db.procedures.getAudios(req.params.idEvento).then((resAudios) => {
                audios = resAudios;
                res();
            });
        });
        let usuario;
        let getUsuario = new Promise((res, rej) => {
            db.procedures.getUsuarioEvento(req.params.idEvento).then((resUsuario) => {
                usuario = resUsuario;
                res();
            });
        });
        await Promise.all([getAudios, getUsuario]);
        res.send({usuario, audios});
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = router;