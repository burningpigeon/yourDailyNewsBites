CREATE OR REPLACE FUNCTION get_user_by_email(email_in TEXT)
RETURNS TABLE(user_id INT, email VARCHAR, password VARCHAR, is_verified BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.user_id, 
        users.email, 
        users.password_hash, 
        users.is_verified
    FROM users
    WHERE users.email = email_in;
END;
$$ LANGUAGE plpgsql;
