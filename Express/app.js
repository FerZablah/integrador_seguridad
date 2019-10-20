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
if (process.env.NODE_ENV !== 'production'){
  const cors = require("cors");
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
} 

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