DELIMITER //
DROP PROCEDURE IF EXISTS removeCategory //
CREATE PROCEDURE removeCategory(
    IN user_id_in INT,
    IN category_id_in INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM user_categories WHERE user_id = user_id_in AND category_id = category_id_in
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User is not subscribed to this category';

    ELSEIF (SELECT COUNT(*) FROM user_categories WHERE user_id = user_id_in) = 1 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User must be subscribed to at least one category';

    ELSE
        DELETE FROM user_categories WHERE user_id = user_id_in AND category_id = category_id_in;
    END IF;
END //
DELIMITER ;
