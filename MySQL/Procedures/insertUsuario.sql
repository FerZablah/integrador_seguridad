DROP PROCEDURE IF EXISTS insertUsuario;
DELIMITER //
CREATE PROCEDURE insertUsuario(IN input_fbUID VARCHAR(36), IN input_name VARCHAR(255), IN input_mail VARCHAR(255), IN input_phone VARCHAR(15))
BEGIN
INSERT INTO Usuario(uid, correo, telefono, nombre) VALUES(input_fbUID, input_mail, input_phone, input_name);
SELECT nombre FROM Usuario WHERE uid = input_fbUID;
END //
DELIMITER ;