//Importar paquetes de NPM
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
} 
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 4000; //Puerto 4000 o definido por Heroku
const bodyParser = require("body-parser");
const db = require('tnc_mysql_connector');

//Ajustes de servidor con express
app.use(bodyParser.json());//Permite recibir cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Esperamos a tener conexion a base de datos para encender servidor
db.connect().then( async () => {
    require('./startup/routes.js')(app);
    //Funcion que monta el servidor en puerto especificado en la variable "port"
    http.listen(port, () => console.log(`Seguridad server running on Port:${port}!`));
}).catch((err) => {
    console.log(err);
});
/*
git subtree push --prefix Express heroku master
*/