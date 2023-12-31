CREATE OR REPLACE PROCEDURE insertStudent (
    _f_name VARCHAR(50),
    _l_name VARCHAR(50),
    _dob DATE,
    _accomodations VARCHAR(500),
    _guardian_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO students (f_name, l_name, dob, accomodations, guardian_id)
    VALUES (_f_name, _l_name, _dob, _accomodations, _guardian_id);
END;
$$;

CREATE OR REPLACE PROCEDURE loadStudentProfiles()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM students;
END;
$$;

CREATE OR REPLACE PROCEDURE loadStudentProfileByID(_student_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM students
    WHERE student_id = _student_id;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteStudent (
    _id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
DELETE FROM students WHERE student_id = _id;

END;
$$;

CREATE OR REPLACE PROCEDURE updateStudentFName(_id INTEGER, _f_name VARCHAR(50))
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE students
    SET f_name = _f_name
    WHERE student_id = _id;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteStudent (
    _id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
DELETE FROM students WHERE student_id = _id;

END;
$$;
