let db;
/**
* getAudios
* @summary Call to procedure getAudios
* @param {String} idEvento
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getAudios('stringExample')
*/

const getAudios = async (idEvento) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getAudios',idEvento));
}
module.exports = {
   getAudios
}