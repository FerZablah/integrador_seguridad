DROP PROCEDURE IF EXISTS insertDispositivo;
DELIMITER //
CREATE PROCEDURE insertDispositivo(IN input_idDispositivo VARCHAR(50), IN input_uid_usuario VARCHAR(36))
BEGIN
INSERT INTO Dispositivo(idDispositivo, uid_usuario) values(input_idDispositivo, input_uid_usuario);
END //
DELIMITER ;