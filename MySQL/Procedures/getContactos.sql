
DROP PROCEDURE IF EXISTS getContactos;
DELIMITER //
CREATE PROCEDURE getContactos(IN input_fbUID VARCHAR(36))
BEGIN
SELECT Contacto.* FROM Contacto
INNER JOIN ContactoUsuario ON telefono_contacto = telefono
WHERE uid_usuario = input_fbUID;
END //
DELIMITER ;