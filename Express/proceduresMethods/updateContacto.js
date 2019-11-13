let db;
/**
* updateContacto
* @summary Call to procedure updateContacto
* @param {String} old_telefono
* @param {String} telefono
* @param {String} nombre
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	updateContacto('stringExample', 'stringExample', 'stringExample')
*/

const updateContacto = async (old_telefono, telefono, nombre) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('updateContacto',old_telefono, telefono, nombre));
}
module.exports = {
   updateContacto
}