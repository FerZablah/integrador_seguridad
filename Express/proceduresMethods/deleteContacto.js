let db;
/**
* deleteContacto
* @summary Call to procedure deleteContacto
* @param {String} telefono
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	deleteContacto('stringExample')
*/

const deleteContacto = async (telefono) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('deleteContacto',telefono));
}
module.exports = {
   deleteContacto
}