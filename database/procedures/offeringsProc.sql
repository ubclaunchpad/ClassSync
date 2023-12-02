
-- Get all offerings by tutor_id
CREATE OR REPLACE PROCEDURE getOfferingsByTutor(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM tutor_offerings
    WHERE tutor_id = _tutor_id;
END;
$$;

-- Get all tutors by course_id
CREATE OR REPLACE PROCEDURE getTutorsByCourse(
    _course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM tutor_offerings
    WHERE course_id = _course_id;
END;
$$;

-- Insert an offering by tutor_id and course_id
CREATE OR REPLACE PROCEDURE insertOffering(
    _tutor_id VARCHAR(50),
    _course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO tutor_offerings (tutor_id, course_id)
    VALUES (_tutor_id, _course_id);
END;
$$;

-- Delete an offering by tutor_id and course_id
CREATE OR REPLACE PROCEDURE deleteOffering(
    _tutor_id VARCHAR(50),
    _course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM tutor_offerings
    WHERE tutor_id = _tutor_id AND course_id = _course_id;
END;
$$;

-- Delete all offerings by tutor_id
CREATE OR REPLACE PROCEDURE deleteOfferingsByTutor(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM offerings
    WHERE tutor_id = _tutor_id;
END;
$$;
