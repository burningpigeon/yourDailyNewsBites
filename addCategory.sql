DELIMITER //
DROP PROCEDURE IF EXISTS addCategory //
CREATE PROCEDURE addCategory(IN usernameIn VARCHAR(50))
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE Users.userName = usernameIn) THEN
        INSERT INTO CATEGORIES(userName, passwordHash, email) VALUES (usernameIn, passwordHashIn, emailIn);
END //
DELIMITER ;