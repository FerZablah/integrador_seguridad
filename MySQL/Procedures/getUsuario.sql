DROP PROCEDURE IF EXISTS getUsuario;
DELIMITER //
CREATE PROCEDURE getUsuario(IN input_fbUID VARCHAR(36))
BEGIN
SELECT nombre FROM Usuario
WHERE uid = input_fbUID;
END //
DELIMITER ;