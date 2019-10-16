let db;
/**
* insertEvento
* @summary Call to procedure insertEvento
* @param {Moment} MomentObject_fecha_hora
* @param {String} liga
* @param {String} uid_usuario
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertEvento(new Moment.utc(), 'stringExample', 'stringExample')
*/

const insertEvento = async (MomentObject_fecha_hora, liga, uid_usuario) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertEvento',MomentObject_fecha_hora, liga, uid_usuario));
}
module.exports = {
   insertEvento
}