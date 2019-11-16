let db;
/**
* deleteDispositivo
* @summary Call to procedure deleteDispositivo
* @param {String} idDispositivo
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	deleteDispositivo('stringExample')
*/

const deleteDispositivo = async (idDispositivo) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('deleteDispositivo',idDispositivo));
}
module.exports = {
   deleteDispositivo
}