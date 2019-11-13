DROP PROCEDURE IF EXISTS updateContacto;
DELIMITER //
CREATE PROCEDURE updateContacto(IN old_input_telefono VARCHAR(30), IN input_telefono VARCHAR(30), IN input_nombre VARCHAR(255))
BEGIN
UPDATE Contacto SET telefono = input_telefono, nombre = input_nombre WHERE telefono = old_input_telefono;
END //
DELIMITER ;