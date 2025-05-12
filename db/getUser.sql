CREATE OR REPLACE FUNCTION get_user_by_email(email_in VARCHAR)
RETURNS TABLE (user_id INT, email VARCHAR, is_verified BOOLEAN)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE email = email_in
    ) THEN
        RAISE EXCEPTION 'Email does not exist.';
    END IF;

    RETURN QUERY
    SELECT user_id, email, is_verified FROM users WHERE email = email_in;
END;
$$;

