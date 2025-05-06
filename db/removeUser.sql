DELIMITER //
DROP PROCEDURE IF EXISTS removeUser //
CREATE PROCEDURE removeUser(
    IN emailIn VARCHAR(100),
    IN passwordHashIn VARCHAR(255)
)
BEGIN
    IF NOT EXISTS ( SELECT 1 FROM users WHERE email = emailIn AND password_hash = passwordHashIn) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found or incorrect password';
    ELSE
        DELETE FROM users WHERE email = emailIn AND password_hash = passwordHashIn;
    END IF;
END //
DELIMITER ;
