DELIMITER //
DROP PROCEDURE IF EXISTS changePassword //
CREATE PROCEDURE (changePassword
    IN currentEmail VARCHAR(50), 
    IN newEmail VARCHAR(50), 
    IN passwordHash VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = userIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Email not found';
    END IF;

    UPDATE Users
    SET 
        userName = COALESCE(newUsername, userName),
    WHERE userId = userIdIn;
END //
DELIMITER ;