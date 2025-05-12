CREATE OR REPLACE PROCEDURE change_password (
    IN user_id_in INT,
    IN currentPasswordHash VARCHAR(255), 
    IN newPasswordHash VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE user_id = user_id_in AND password_hash = currentPasswordHash
    ) THEN
        RAISE EXCEPTION 'Incorrect current password';
    END IF;

    UPDATE users
    SET password_hash = newPasswordHash
    WHERE user_id = user_id_in;
END;
$$;
