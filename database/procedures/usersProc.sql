CREATE OR REPLACE PROCEDURE insertTutorUser(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (role, email)
    VALUES ('tutor', _tutor_id);
    RETURNING user_id;
END;
END;