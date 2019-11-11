const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");

router.get('/:uid', async (req, res) => { 
    try {
        if(!req.params.uid){
            console.log('No uid received');
            return res.status(400).send('No uid received');
        } 
        const nombre = db.procedures.getUsuario(req.params.uid)[0];
        res.send(nombre);
    }
    catch(e) {
        console.log(e);
    }
});