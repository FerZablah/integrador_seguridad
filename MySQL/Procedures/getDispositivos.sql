DROP PROCEDURE IF EXISTS getDispositivos;
DELIMITER //
CREATE PROCEDURE getDispositivos(IN input_uid VARCHAR(36))
BEGIN
SELECT idDispositivo FROM Dispositivo 
WHERE uid_usuario = input_uid;
END //