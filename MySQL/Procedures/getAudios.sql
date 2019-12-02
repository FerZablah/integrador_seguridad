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
CALL getAudios('277a7af0-0a93-11ea-beb7-93b9567f9d62');
*/