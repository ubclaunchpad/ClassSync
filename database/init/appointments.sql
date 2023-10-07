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
    student_notes JSON,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
	FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
END;
$$;



