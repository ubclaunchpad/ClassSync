CREATE OR REPLACE PROCEDURE createUsers()

LANGUAGE plpgsql 
AS $$


BEGIN
CREATE TABLE appointments (
    appointment_id SERIAL NOT NULL PRIMARY KEY,
	student_id VARCHAR(50) NOT NULL,
	tutor_id VARCHAR(50) NOT NULL,
	course_id VARCHAR(50) NOT NULL,
    appointment_start TIMESTAMP NOT NULL,
    duration INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(student_id),
    -- change FK it to tutors table - this is a working example from users table
    -- Requires unique constraint on the key being referenced
    FOREIGN KEY (tutor_id) REFERENCES users(email), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
END$$



