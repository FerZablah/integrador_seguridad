const express = require('express');
const router = express.Router();
const db = require("tnc_mysql_connector");

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
module.exports = router;