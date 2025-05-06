DELIMITER //
DROP PROCEDURE IF EXISTS changeEmail //
CREATE PROCEDURE changeEmail(
    IN currentEmail VARCHAR(100),
    IN newEmail VARCHAR(100),
    IN passwordHashIn VARCHAR(255)
)
BEGIN
    DECLARE userId INT;
    SELECT user_id INTO userId
    FROM users
    WHERE email = currentEmail AND password_hash = passwordHashIn;

    IF userId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email or password';
    END IF;

    IF newEmail IS NOT NULL AND EXISTS (
        SELECT 1 FROM users
        WHERE email = newEmail AND user_id != userId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email is already connected to an account';
    END IF;

    UPDATE users SET email = newEmail WHERE user_id = userId;
END //
DELIMITER ;
