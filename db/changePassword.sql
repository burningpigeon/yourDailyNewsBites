DELIMITER //
DROP PROCEDURE IF EXISTS changePassword //
CREATE PROCEDURE changePassword(
    IN user_id_in INT,
    IN currentPasswordHash VARCHAR(255), 
    IN newPasswordHash VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = user_id_in AND password_hash = currentPasswordHash) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Incorrect current password';
    END IF;

    UPDATE users SET password_hash = newPasswordHash WHERE user_id = user_id_in;
END //
DELIMITER ;
