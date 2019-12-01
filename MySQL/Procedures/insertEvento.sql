DROP PROCEDURE IF EXISTS insertEvento;
DELIMITER //
CREATE PROCEDURE insertEvento(IN input_fecha_hora DATETIME, IN input_liga VARCHAR(255), input_idDispositivo VARCHAR(50))
BEGIN
INSERT INTO Evento(fecha_hora, liga, uid_usuario) values(input_fecha_hora, input_liga, (SELECT uid_usuario FROM Dispositivo where idDispositivo = input_idDispositivo LIMIT 1));
SELECT last_insert_id() as idEvento;
END //
DELIMITER ;