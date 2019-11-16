let db;
/**
* insertDispositivo
* @summary Call to procedure insertDispositivo
* @param {String} idDispositivo
* @param {String} uid_usuario
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertDispositivo('stringExample', 'stringExample')
*/

const insertDispositivo = async (idDispositivo, uid_usuario) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertDispositivo',idDispositivo, uid_usuario));
}
module.exports = {
   insertDispositivo
}