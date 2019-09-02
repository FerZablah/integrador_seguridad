const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const accountSid = 'AC85eb3c7abf9a7aeaac0dcfbd5c70efa8';
const authToken = 'ef83b8fb6bb6ee176d437275c8bbaf5e';
const client = require('twilio')(accountSid, authToken);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sos', async (req, res) => {
    const sms = new Promise((resolve,reject) => {
        client.messages
        .create({
            from: '+12563630857',
            to: '+528711499240',
            body: `SOS Necesito ayuda en: ${req.body.lat} : ${req.body.lon}`
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
                body: `SOS Necesito ayuda en: ${req.body.lat} : ${req.body.lon}`
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