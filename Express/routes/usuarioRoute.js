const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");
const usuarioSchema = require('../models/usuario.js');

router.get('/:uid', async (req, res) => { 
    try {
        console.log(req.params);
        if(!req.params.uid){
            console.log('No uid received');
            return res.status(400).send('No uid received');
        }
        const nombre = await db.procedures.getUsuario(req.params.uid);
        res.send(nombre[0]);
    }
    catch(e) {
        console.log(e);
    }
});
router.post('/', async (req, res) => { 
    try {
        const {error} = joi.validate(req.body, usuarioSchema.schema);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        }
        const { uid, name, mail, phone } = req.body;
        const nombre = await db.procedures.insertUsuario(uid, name, mail, phone);
        res.send(nombre[0]);
    }
    catch(e) {
        console.log(e);
    }
});
module.exports = router;