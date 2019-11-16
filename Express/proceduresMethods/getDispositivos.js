let db;
/**
* getDispositivos
* @summary Call to procedure getDispositivos
* @param {String} uid
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getDispositivos('stringExample')
*/

const getDispositivos = async (uid) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getDispositivos',uid));
}
module.exports = {
   getDispositivos
}