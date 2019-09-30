const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('dotenv').config({path: '../../../.env'});

axios({
    url: `https://api.foursquare.com/v2/venues/search?ll=25.660015666666666,-100.44092133333334&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_SECRET}&v=20190905`,
    method: 'get'
}).then((response) => {
    //Nombre del Punto de interes mas cercano
    const nombrePOI = response.data.response.venues[0].name;
    //Direccion ya en formato para envio de mensaje
    let direcciones = response.data.response.venues[0].location.formattedAddress;
    let direccionFinal = '';
    direcciones.forEach(direccion => {
        direccionFinal += direccion + ' ';
    });
    console.log(nombrePOI, direccionFinal);
});