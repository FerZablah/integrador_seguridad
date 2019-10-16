let db;
/**
* insertAudio
* @summary Call to procedure insertAudio
* @param {Number} id_evento
* @param {Moment} MomentObject_fecha_hora_audio
* @param {String} liga
* @return {Array} Returns array of results if procedure has a SELECT 
* @example
*
*	insertAudio(1, new Moment.utc(), 'stringExample')
*/

const insertAudio = async (id_evento, MomentObject_fecha_hora_audio, liga) => {
   if(!db) db = require("tnc_mysql_connector");
   return (await db.queryProcedure('insertAudio',id_evento, MomentObject_fecha_hora_audio, liga));
}
module.exports = {
   insertAudio
}