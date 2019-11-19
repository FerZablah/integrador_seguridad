let db;
/**
* getContactosByDispositivo
* @summary Call to procedure getContactosByDispositivo
* @param {String} idDispositivo
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getContactosByDispositivo('stringExample')
*/

const getContactosByDispositivo = async (idDispositivo) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getContactosByDispositivo',idDispositivo));
}
module.exports = {
   getContactosByDispositivo
}