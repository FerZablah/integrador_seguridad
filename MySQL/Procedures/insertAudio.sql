DROP PROCEDURE IF EXISTS insertAudio;
DELIMITER //
CREATE PROCEDURE insertAudio(IN input_id_evento INT, IN input_fecha_hora_audio DATETIME)
BEGIN
INSERT INTO Audio(id_evento, fecha_hora_audio) values(input_id_evento, input_fecha_hora_audio);
END //
DELIMITER ;