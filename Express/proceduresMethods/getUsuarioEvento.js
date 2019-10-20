let db;
/**
* getUsuarioEvento
* @summary Call to procedure getUsuarioEvento
* @param {String} idEvento
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getUsuarioEvento('stringExample')
*/

const getUsuarioEvento = async (idEvento) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getUsuarioEvento',idEvento));
}
module.exports = {
   getUsuarioEvento
}