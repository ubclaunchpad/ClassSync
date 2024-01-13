CREATE OR REPLACE PROCEDURE insertGuardian (
    user_id INTEGER,
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    heard_from VARCHAR(50),
    referred_by VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO guardians (user_id, f_name, l_name, heard_from, referred_by)
    VALUES (user_id, f_name, l_name, heard_from, referred_by);
END;
$$;
