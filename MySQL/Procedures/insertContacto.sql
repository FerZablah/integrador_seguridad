DROP PROCEDURE IF EXISTS insertContacto;
DELIMITER //
CREATE PROCEDURE insertContacto(IN input_telefono VARCHAR(30), IN input_nombre VARCHAR(255), IN input_uid VARCHAR(36))
BEGIN
INSERT INTO Contacto(telefono, nombre) values(input_telefono, input_nombre);
INSERT INTO ContactoUsuario(uid_usuario, telefono_contacto) values(input_uid, input_telefono);
END //
DELIMITER ;