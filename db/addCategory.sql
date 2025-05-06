DELIMITER //
DROP PROCEDURE IF EXISTS addCategory //
CREATE PROCEDURE addCategory(
    IN user_id_in INT,
    IN category_id_in INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE user_id = user_id_in
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM categories WHERE category_id = category_id_in
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Category not found';
    END IF;

    IF EXISTS (
        SELECT 1 FROM user_categories WHERE user_id = user_id_in AND category_id = category_id_in
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is already subscribed to this category';
    ELSE
        INSERT INTO user_categories (user_id, category_id)VALUES (user_id_in, category_id_in);
    END IF;
END //
DELIMITER ;
