let db;
/**
* getUsuario
* @summary Call to procedure getUsuario
* @param {String} fbUID
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getUsuario('stringExample')
*/

const getUsuario = async (fbUID) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getUsuario',fbUID));
}
module.exports = {
   getUsuario
}