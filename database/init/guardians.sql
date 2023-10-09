DROP TABLE IF EXISTS "guardians";
CREATE OR REPLACE PROCEDURE createGuardians()

LANGUAGE plpgsql 
AS $$
BEGIN

CREATE TABLE IF NOT EXISTS "guardians" (
    guardian_id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    heard_from VARCHAR(50) NOT NULL,
    referred_by VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

END;
$$;