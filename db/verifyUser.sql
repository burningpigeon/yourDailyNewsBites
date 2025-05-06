DELIMITER //
DROP PROCEDURE IF EXISTS verifyUser //
CREATE PROCEDURE verifyUser(IN userIdIn INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Verification failed due to an internal error.';
    END;

    START TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM verification WHERE user_id = userIdIn
    ) THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not registered or already verified.';
    ELSE
        UPDATE user SET is_verified = TRUE WHERE user_id = userIdIn;
        DELETE FROM verification WHERE user_id = userIdIn;

        COMMIT;
    END IF;
END //

DELIMITER ;
