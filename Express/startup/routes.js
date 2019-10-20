//Aqui juntamos todas las rutas de express y las exportamos al app.js que es nuestro archivo app
const sosRoute = require('../routes/sosRoute.js');
const audioRoute = require('../routes/audioRoute.js');
const eventoRoute = require('../routes/eventoRoute.js');
module.exports = (app) => {
    app.use('/sos', sosRoute);
    app.use('/audio', audioRoute);
    app.use('/evento', eventoRoute);
}
