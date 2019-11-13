let db;
/**
* insertContacto
* @summary Call to procedure insertContacto
* @param {String} telefono
* @param {String} nombre
* @param {String} uid
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertContacto('stringExample', 'stringExample', 'stringExample')
*/

const insertContacto = async (telefono, nombre, uid) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertContacto',telefono, nombre, uid));
}
module.exports = {
   insertContacto
}