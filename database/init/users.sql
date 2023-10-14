DROP TABLE IF EXISTS "users";
CREATE OR REPLACE PROCEDURE createUsers()

LANGUAGE plpgsql 
AS $$

BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='userEnum') 
THEN CREATE TYPE userEnum AS ENUM ('admin', 'user', 'guardian');
END IF;

CREATE TABLE "users" (
    user_id SERIAL NOT NULL PRIMARY KEY,
    role userEnum NOT NULL,
    email VARCHAR(50) NOT NULL
);

END;
$$;