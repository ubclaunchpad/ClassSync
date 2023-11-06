DROP TABLE IF EXISTS "tutor_offerings";
CREATE OR REPLACE PROCEDURE createTutorOfferings()

LANGUAGE plpgsql
AS $$
BEGIN
CREATE TABLE tutor_offerings (
    tutor_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    PRIMARY KEY (tutor_id, course_id)
);
END;