DELIMITER //
DROP PROCEDURE IF EXISTS editUser //
CREATE PROCEDURE editUser(
    IN currentEmail, 
    IN newEmail VARCHAR(50), 
    IN passwordHash VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = userIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Email not found';
    END IF;
    
    IF newUsername IS NOT NULL AND EXISTS (SELECT 1 FROM Users WHERE userName = newUsername AND userId != userIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Email is already connected to an account';
    END IF;

    UPDATE Users
    SET 
        userName = COALESCE(newUsername, userName),
    WHERE userId = userIdIn;
END //
DELIMITER ;