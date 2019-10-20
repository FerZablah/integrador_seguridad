DROP PROCEDURE IF EXISTS getUsuarioEvento;
DELIMITER //
CREATE PROCEDURE getUsuarioEvento(IN input_idEvento VARCHAR(255))
BEGIN
SELECT nombre FROM Evento 
INNER JOIN Usuario ON Usuario.uid = Evento.uid_usuario
WHERE Evento.liga = input_idEvento;
END //
DELIMITER ;