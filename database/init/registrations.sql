DROP TABLE IF EXISTS "registrations";
CREATE OR REPLACE PROCEDURE createRegistrations()

LANGUAGE plpgsql 
AS $$


BEGIN
CREATE TABLE registrations (
    registration_id SERIAL NOT NULL PRIMARY KEY,
	guardian_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	course_id INTEGER NOT NULL,
    session_id INTEGER NOT NULL,
    registration_date DATE NOT NULL,
    FOREIGN KEY (guardian_id) REFERENCES guardians(guadian_id), 
	FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
END;
$$;