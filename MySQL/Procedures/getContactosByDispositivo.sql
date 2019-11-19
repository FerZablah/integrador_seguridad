DROP PROCEDURE IF EXISTS getContactosByDispositivo;
DELIMITER //
CREATE PROCEDURE getContactosByDispositivo(IN input_idDispositivo VARCHAR(50))
BEGIN
SELECT telefono_contacto as numero FROM Dispositivo
INNER JOIN ContactoUsuario ON Dispositivo.uid_usuario = ContactoUsuario.uid_usuario
WHERE Dispositivo.idDispositivo = idDispositivo;
END //
DELIMITER ;