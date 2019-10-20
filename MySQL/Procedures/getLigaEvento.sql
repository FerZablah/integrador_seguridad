DROP PROCEDURE IF EXISTS getLigaEvento;
DELIMITER //
CREATE PROCEDURE getLigaEvento(IN input_idEvento VARCHAR(255))
BEGIN
SELECT liga FROM Evento 
WHERE Evento.idEvento = input_idEvento;
END //
DELIMITER ;