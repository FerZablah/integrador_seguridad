let db;
/**
* getContactos
* @summary Call to procedure getContactos
* @param {String} fbUID
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getContactos('stringExample')
*/

const getContactos = async (fbUID) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getContactos',fbUID));
}
module.exports = {
   getContactos
}