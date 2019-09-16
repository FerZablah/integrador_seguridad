//Importar paquetes de NPM
const express = require('express');
const app = express();
const port = process.env.PORT || 4000; //Puerto 4000 o definido por Heroku
const bodyParser = require("body-parser");
//Llaves de conexion de Twilio
const accountSid = 'AC85eb3c7abf9a7aeaac0dcfbd5c70efa8';
const authToken = 'ef83b8fb6bb6ee176d437275c8bbaf5e';
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');

//Ajustes de servidor con express
app.use(bodyParser.json());//Permite recibir cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));

//Post que recibe un cuerpo: 
/*
{
    lat: String,
    lon: String
}
*/
app.post('/sos', async (req, res) => {
    //Se llama al api de foursquare para obtener direccion mas cercana a las coordenadas
    const response = await axios({
        url: `https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${req.body.lon}&client_id=HDJQ0G4WXC3LHTIDNKN5VSSCIRUWWFN3EH4CLSD0CMC3CNEM&client_secret=5DFNH2VNB2Z3UWLLBYVUL2PC1SBBWQENCEFJGOSH3XDOEB2I&v=20190905`,
        method: 'get'
    });
    //Nombre del Punto de interes mas cercano
    const nombrePOI = response.data.response.venues[0].name;
    //Direccion ya en formato para envio de mensaje
    let direccion = response.data.response.venues[0].location.formattedAddress;
    direccion = direccion[0] + ' '+ direccion [1] + ' '+ direccion[2];
    console.log(nombrePOI, direccion);
    //Se crea la llamada asincrona para enviar un SMS
    const sms = new Promise((resolve,reject) => {
        client.messages
        .create({
            from: '+12563630857',
            to: '+528711499240',
            body: `SOS Necesito ayuda en: https://maps.google.com/?q=${req.body.lat},${req.body.lon} cerca de ${nombrePOI} con direccion en ${direccion}`
        })
        .then(message => {
            resolve();
        })
        .done();
    });
    //Se crea la llamada asincrona para enviar un whatsapp
    const whatsapp = new Promise((resolve,reject) => {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+5218711499240',
                body: `SOS Necesito ayuda en: https://maps.google.com/?q=${req.body.lat},${req.body.lon}`
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
});
//Funcion que monta el servidor en puerto especificado en la variable "port"
app.listen(port, () => {
    console.log(`integrador seguridad listening on port ${port}!`);
});