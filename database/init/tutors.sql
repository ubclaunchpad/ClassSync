DROP TABLE IF EXISTS "tutors";
CREATE OR REPLACE PROCEDURE createTutors()

LANGUAGE plpgsql 
AS $$
BEGIN

CREATE TABLE "tutors" (
    tutor_id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    bio VARCHAR(500) NOT NULL,
    is_activated BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

END;
$$;