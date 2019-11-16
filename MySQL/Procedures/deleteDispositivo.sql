DROP PROCEDURE IF EXISTS deleteDispositivo;
DELIMITER //
CREATE PROCEDURE deleteDispositivo(IN input_idDispositivo VARCHAR(50))
BEGIN
DELETE FROM Dispositivo WHERE idDispositivo = input_idDispositivo;
END //
DELIMITER ;