let db;
/**
* insertUsuario
* @summary Call to procedure insertUsuario
* @param {String} fbUID
* @param {String} name
* @param {String} mail
* @param {String} phone
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertUsuario('stringExample', 'stringExample', 'stringExample', 'stringExample')
*/

const insertUsuario = async (fbUID, name, mail, phone) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertUsuario',fbUID, name, mail, phone));
}
module.exports = {
   insertUsuario
}