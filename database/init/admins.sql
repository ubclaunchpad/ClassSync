DROP TABLE IF EXISTS "admins";
CREATE OR REPLACE PROCEDURE createAdmins()

LANGUAGE plpgsql 
AS $$
BEGIN

CREATE TABLE "admins" (
    admin_id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

END;
$$;