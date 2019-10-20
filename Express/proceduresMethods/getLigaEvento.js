let db;
/**
* getLigaEvento
* @summary Call to procedure getLigaEvento
* @param {String} idEvento
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	getLigaEvento('stringExample')
*/

const getLigaEvento = async (idEvento) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('getLigaEvento',idEvento));
}
module.exports = {
   getLigaEvento
}