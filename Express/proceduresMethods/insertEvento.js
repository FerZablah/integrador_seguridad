let db;
/**
* insertEvento
* @summary Call to procedure insertEvento
* @param {Moment} MomentObject_fecha_hora
* @param {String} liga
* @param {String} uid_usuario
* @param {String} idDispositivo
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertEvento(new Moment.utc(), 'stringExample', 'stringExample', 'stringExample')
*/

const insertEvento = async (MomentObject_fecha_hora, liga, uid_usuario, idDispositivo) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertEvento',MomentObject_fecha_hora, liga, uid_usuario, idDispositivo));
}
module.exports = {
   insertEvento
}