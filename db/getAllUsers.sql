DELIMITER //
DROP PROCEDURE IF EXISTS getAllUsers //
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT user_id, email, is_verified FROM users;
END //
DELIMITER ;
