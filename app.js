const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const accountSid = 'AC85eb3c7abf9a7aeaac0dcfbd5c70efa8';
const authToken = 'ef83b8fb6bb6ee176d437275c8bbaf5e';
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sos', async (req, res) => {
    
    const response = await axios({
        url: `https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${req.body.lon}&client_id=HDJQ0G4WXC3LHTIDNKN5VSSCIRUWWFN3EH4CLSD0CMC3CNEM&client_secret=5DFNH2VNB2Z3UWLLBYVUL2PC1SBBWQENCEFJGOSH3XDOEB2I&v=20190905`,
        method: 'get'
    });
    
    const nombrePOI = response.data.response.venues[0].name;
    let direccion = response.data.response.venues[0].location.formattedAddress;
    direccion = direccion[0] + ' '+ direccion [1] + ' '+ direccion[2];
    console.log(nombrePOI, direccion);
    
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
    await Promise.all([sms, whatsapp]);
    res.status(200).send();
});

app.listen(port, function () {
    console.log(`integrador seguridad listening on port ${port}!`);
});