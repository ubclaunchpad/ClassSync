CREATE OR REPLACE PROCEDURE addUser(
    _role userEnum,
    _email VARCHAR(50),
    _hashed_password VARCHAR(255)
)

LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO "users" (role, email, hashed_password)
    VALUES (_role, _email, _hashed_password);

END;
$$;

CREATE OR REPLACE PROCEDURE deleteUser(
    _id INT
)

LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "users"
    WHERE user_id = _id;
END;
$$;

CREATE OR REPLACE PROCEDURE updatePassword(
    _id INT,
    _hashed_password VARCHAR(255)
)

LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "users"
    SET hashed_password = _hashed_password
    WHERE user_id = _id;
END;
$$;


