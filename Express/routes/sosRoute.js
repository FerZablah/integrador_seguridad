const sosSchema = require('../models/sos.js');
const express = require('express');
const router = express.Router();
const joi = require('@hapi/joi');
//Llaves de conexion de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
//Post que recibe un cuerpo: 
/*
{
    lat: String,
    lon: String
}
*/
router.post('/', async (req, res) => { 
      try {
        console.log(req.body);
        const {error} = joi.validate(req.body, sosSchema.schema);
        if(error) return res.status(400).send(error.message);
        //Se llama al api de foursquare para obtener direccion mas cercana a las coordenadas
        const response = await axios({
            url: `https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${req.body.lon}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_SECRET}&v=20190905`,
            method: 'get'
        });
        //Nombre del Punto de interes mas cercano
        const nombrePOI = response.data.response.venues[0].name;
        //Direccion ya en formato para envio de mensaje
        let direcciones = response.data.response.venues[0].location.formattedAddress;
        let direccionFinal = '';
        direcciones.forEach(direccion => {
            direccionFinal += direccion + ' ';
        });
        //Se crea la llamada asincrona para enviar un SMS
        const sms = new Promise((resolve, reject) => {
            client.messages
                .create({
                    from: process.env.TWILIO_SMS_NUMBER,
                    to: process.env.TWILIO_EMERGENCY_NUMBER,
                    body: `SOS Necesito ayuda en: https://maps.google.com/?q=${req.body.lat},${req.body.lon} cerca de ${nombrePOI} con direccion en ${direccionFinal}`
                })
                .then(message => {
                    resolve();
                })
                .done();
        });
        //Se crea la llamada asincrona para enviar un whatsapp
        const whatsapp = new Promise((resolve, reject) => {
            client.messages
                .create({
                    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                    to: `whatsapp:${process.env.TWILIO_EMERGENCY_NUMBER}`,
                    body: `SOS Necesito ayuda en: https://maps.google.com/?q=${req.body.lat},${req.body.lon} cerca de ${nombrePOI} con direccion en ${direccionFinal}`
                })
                .then(message => {
                    resolve();
                })
                .done();
        });
        //Se espera a que ambas llamadas asincronas se completen
        await Promise.all([sms, whatsapp]);
        //Se envia un mensaje de exito (200) al cliente
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
module.exports = router;