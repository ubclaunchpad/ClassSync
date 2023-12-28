
CREATE OR REPLACE PROCEDURE insertUser(
    _role userenum,
    _email VARCHAR(255),
    _hashedPassword VARCHAR(255),
    _firstName VARCHAR(255),
    _lastName VARCHAR(255),
    OUT id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO users (role, email, hashedPassword, firstName, lastName) 
  VALUES (_role, _email, _hashedPassword, _firstName, _lastName) 
  RETURNING user_id INTO id;
END;
$$;

CREATE OR REPLACE PROCEDURE getUserByEmailAndRole(_email VARCHAR(50), _role userEnum, OUT password VARCHAR(100)) LANGUAGE plpgsql AS $$ BEGIN SELECT hashedPassword INTO password FROM users WHERE email = _email AND role = _role; END; $$;

