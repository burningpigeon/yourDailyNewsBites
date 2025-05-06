DELIMITER //
DROP PROCEDURE IF EXISTS getUserCategories //
CREATE PROCEDURE getUserCategories(
    IN email_in VARCHAR(255)
)
BEGIN
    DECLARE user_id_val INT;
    SELECT user_id INTO user_id_val FROM users WHERE email = email_in;

    IF user_id_val IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User with this email does not exist';
    ELSE
        SELECT c.category_id, c.name FROM categories c
        JOIN user_categories uc ON c.category_id = uc.category_id WHERE uc.user_id = user_id_val;
    END IF;
END //
DELIMITER ;
