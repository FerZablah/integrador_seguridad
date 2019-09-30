if (process.env.NODE_ENV !== 'production') require('dotenv').config({path: '../../../.env'});

//Llaves de conexion de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${process.env.TWILIO_WHATSAPP_EMERGENCY_NUMBER}`,
        body: 'TEST SMS FROM BACKEND'
    })
    .then(message => {
        console.log(message);
    })
    .done();
