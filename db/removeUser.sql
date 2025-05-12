CREATE OR REPLACE PROCEDURE remove_user(
    IN emailIn VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE email = emailIn 
    ) THEN
        RAISE EXCEPTION 'User not found';
    ELSE
        DELETE FROM users WHERE email = emailIn 
    END IF;
END;
$$;
