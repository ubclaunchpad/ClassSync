
CREATE OR REPLACE PROCEDURE insertUser(_email VARCHAR(50), _hashedPassword VARCHAR(100), _role userEnum, OUT id INTEGER) LANGUAGE plpgsql AS $$ BEGIN INSERT INTO users (role, email, hashedPassword) VALUES (_role, _email, _hashedPassword) RETURNING user_id INTO id; END; $$;

-- create proc to get user by email and role select hashed password
CREATE OR REPLACE PROCEDURE getUserByEmailAndRole(_email VARCHAR(50), _role userEnum, OUT password VARCHAR(100)) LANGUAGE plpgsql AS $$ BEGIN SELECT hashedPassword INTO password FROM users WHERE email = _email AND role = _role; END; $$;

