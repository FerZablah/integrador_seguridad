DROP PROCEDURE IF EXISTS deleteContacto;
DELIMITER //
CREATE PROCEDURE deleteContacto(IN input_telefono VARCHAR(30))
BEGIN
DELETE FROM Contacto WHERE telefono = input_telefono;
END //
DELIMITER ;