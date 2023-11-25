-- create new procedure to add a student
CREATE OR REPLACE PROCEDURE addStudent(
    _course_name VARCHAR(50),    
    _course_difficulty course_difficulty,
    _course_description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO courses (course_name, course_difficulty, course_description)
    VALUES (_course_name, _course_difficulty, _course_description);
END;
$$;


-- create new procedure to delete a course
CREATE OR REPLACE PROCEDURE deleteCourse(
    _course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM courses
    WHERE course_id = _course_id;
END;
$$;

-- create new procedure to update a course
CREATE OR REPLACE PROCEDURE updateCourse(
    _course_id INTEGER,
    _course_name VARCHAR(50),    
    _course_difficulty course_difficulty,
    _course_description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE courses
    SET
        course_name = _course_name,
        course_difficulty = _course_difficulty,
        course_description = _course_description
    WHERE course_id = _course_id;
END;
$$;

-- create new procedure to get all courses
CREATE OR REPLACE PROCEDURE getCourses()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM courses;
END;
$$;

