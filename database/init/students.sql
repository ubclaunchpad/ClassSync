DROP TABLE IF EXISTS "students";
CREATE OR REPLACE PROCEDURE createStudents()

LANGUAGE plpgsql 
AS $$
BEGIN

CREATE TABLE "students" (
    student_id SERIAL NOT NULL PRIMARY KEY,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    accomodations VARCHAR(500) NOT NULL,
    guardian_id INTEGER NOT NULL,
    FOREIGN KEY (guardian_id) REFERENCES guardians(guardian_id)
);

END;
$$;