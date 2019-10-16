DROP PROCEDURE IF EXISTS insertEvento;
DELIMITER //
CREATE PROCEDURE insertEvento(IN input_fecha_hora DATETIME, IN input_liga VARCHAR(255), IN input_uid_usuario VARCHAR(36))
BEGIN
INSERT INTO Evento(fecha_hora, liga, uid_usuario) values(input_fecha_hora, input_liga, input_uid_usuario);
SELECT last_insert_id() as idEvento;
END //
DELIMITER ; 