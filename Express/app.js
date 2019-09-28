//Importar paquetes de NPM
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 4000; //Puerto 4000 o definido por Heroku
const bodyParser = require("body-parser");

//Ajustes de servidor con express
app.use(bodyParser.json());//Permite recibir cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));

require('./startup/routes.js')(app);
//Funcion que monta el servidor en puerto especificado en la variable "port"
http.listen(port, () => console.log(`Seguridad server running on Port:${port}!`));