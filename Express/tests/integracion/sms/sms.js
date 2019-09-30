if (process.env.NODE_ENV !== 'production') require('./node_modules/dotenv').config({path: '../../../.env'});

//Llaves de conexion de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('./node_modules/twilio')(accountSid, authToken);

client.messages
    .create({
        from: process.env.TWILIO_SMS_NUMBER,
        to: process.env.TWILIO_EMERGENCY_NUMBER,
        body: 'TEST SMS FROM BACKEND'
    })
    .then(message => {
        console.log(message);
    })
    .done();