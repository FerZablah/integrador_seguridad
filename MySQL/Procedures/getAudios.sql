DROP PROCEDURE IF EXISTS getAudios;
DELIMITER //
CREATE PROCEDURE getAudios(IN input_idEvento VARCHAR(255))
BEGIN
SELECT fecha_hora_audio, Audio.liga FROM Evento 
INNER JOIN Audio ON Audio.id_evento = Evento.idEvento
WHERE Evento.liga = input_idEvento;
END //
DELIMITER ;
/*
CALL getAudios('0e0697b0-f04a-11e9-97a2-db1205a2b288');
*/