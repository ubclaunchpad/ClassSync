DROP TABLE IF EXISTS "appointments";
CREATE OR REPLACE PROCEDURE createAppointments()

LANGUAGE plpgsql 
AS $$


BEGIN
CREATE TABLE appointments (
    appointment_id SERIAL NOT NULL PRIMARY KEY,
	student_id INTEGER NOT NULL,
	tutor_id INTEGER NOT NULL,
	course_id INTEGER NOT NULL,
    appointment_start TIMESTAMP NOT NULL,
    duration INT NOT NULL,
        -- Requires unique constraint on the key being referenced
	FOREIGN KEY (student_id) REFERENCES students(student_id),
    -- change FK it to tutors table - this is a working example from users table
    -- Requires unique constraint on the key being referenced
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
END;
$$;



