const sosSchema = require('../models/sos.js');
const express = require('express');
const router = express.Router();
const joi = require('@hapi/joi');
//Llaves de conexion de Twilio 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
/*const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID;
const authToken = process.env.TWILIO_TEST_AUTH_TOKEN;*/
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
const rpiMiddle = require('../middlewears/rpiClient');
const db = require("tnc_mysql_connector");
const moment = require('moment');
const uuidv1 = require('uuid/v1');
//Post que recibe un cuerpo: 
/*
{
    lat: String,
    lon: String
}
*/
const generateMessageBody = (lat, lon, response, liga) => {
    //Nombre del Punto de interes mas cercano
    const nombrePOI = response.data.response.venues[0].name;
    //Direccion ya en formato para envio de mensaje
    let direcciones = response.data.response.venues[0].location.formattedAddress;
    let direccionFinal = '';
    direcciones.forEach(direccion => {
        direccionFinal += direccion + ' ';
    });
    return `SOS Necesito ayuda en: https://maps.google.com/?q=${lat},${lon} 
    cerca de ${nombrePOI} con dirección en ${direccionFinal}.
    Escucha lo que está pasando en: https://seguridad-integrador-web.herokuapp.com/home?q=${liga}`;
}
const sendSMS = (body, number) => {
    return (
        new Promise((resolve, reject) => {
            client.messages
                .create({
                    from: process.env.TWILIO_SMS_NUMBER,
                    to: number,
                    body
                })
                .then(message => {
                    console.log(message);
                    resolve();
                })
                .done();
        })
    );
}

const sendWhatsapp = (body, number) => {
    return (
        new Promise((resolve, reject) => {
            client.messages
                .create({
                    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                    to: `whatsapp:${number}`,
                    body
                })
                .then(message => {
                    resolve();
                })
                .done();
        })
    );
}

router.post('/', /*rpiMiddle,*/ async (req, res) => { 
      try {
        //Se valida que se reciban los datos correctos.
        const {error} = joi.validate(req.body, sosSchema.schema);
        if(error){
            console.log('JOI error, received', req.body, error);
            return res.status(400).send(error);
        }
        let idEvento;
        let ligaEvento;
        if(!req.body.idEvento){
            //Se crea evento en MySQL
            ligaEvento = uuidv1();
            const arr = await db.procedures.insertEvento(new moment.utc(), ligaEvento, req.body.idDispositivo);
            idEvento = arr[0].idEvento;
        }
        else{
            //obtener liga del evento
            const arr = await db.procedures.getLigaEvento(req.body.idEvento);
            console.log(arr)
            ligaEvento = arr[0].liga;
        }

        //Se llama al api de foursquare para obtener direccion mas cercana a las coordenadas
        const foursquareResponse = await axios({
            url: `https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${req.body.lon}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_SECRET}&v=20190905`,
            method: 'get'
        });
        //Se genera el cuerpo del mensaje
        const body = generateMessageBody(req.body.lat, req.body.lon, foursquareResponse, ligaEvento);
        const contacts = await db.procedures.getContactosByDispositivo(req.body.idDispositivo);
        const promises = [];
        contacts.forEach((contact) => {
            //Se crea la llamada asincrona para enviar un SMS
            promises.push(sendSMS(body, contact.numero));
            //Se crea la llamada asincrona para enviar un whatsapp
            promises.push(sendWhatsapp(body, contact.numero));  
        })
        //Se espera a que ambas llamadas asincronas se completen
        await Promise.all(promises);
        //Se envia un mensaje de exito (200) al cliente
        if(idEvento)
            return res.status(200).send({ idEvento });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
module.exports = router;