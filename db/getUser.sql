DELIMITER //
DROP PROCEDURE IF EXISTS getUserByEmail //
CREATE PROCEDURE getUserByEmail(
    IN email_in VARCHAR(255)
)
BEGIN
    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = email_in) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Email does not exist.';
    ELSE
        SELECT user_id, email, is_verified FROM users WHERE email = email_in;
    END IF;
END //
DELIMITER ;
