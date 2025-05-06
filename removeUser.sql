DELIMITER //
DROP PROCEDURE IF EXISTS removeUser //
CREATE PROCEDURE removeUser(IN usernameIn VARCHAR(50))
    BEGIN
        IF NOT EXISTS (SELECT * FROM Users WHERE Users.userName = usernameIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User does not exists.';
        ELSE
            DROP USER usernameIn;
        END IF;
END //
DELIMITER ;