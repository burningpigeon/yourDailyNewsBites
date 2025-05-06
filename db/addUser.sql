DELIMITER //
DROP PROCEDURE IF EXISTS addUser //
CREATE PROCEDURE addUser(
    IN emailIn VARCHAR(100), 
    IN passwordHashIn VARCHAR(255), 
    IN verificationCodeIn VARCHAR(255)
)
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE email = emailIn) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use';
    ELSE
        INSERT INTO users (email, password_hash, is_verified) VALUES (emailIn, passwordHashIn, FALSE);
        INSERT INTO verification (user_id, verification_code) VALUES (LAST_INSERT_ID(), verificationCodeIn);
        SELECT LAST_INSERT_ID() AS new_user_id;
    END IF;
END //
DELIMITER ;
