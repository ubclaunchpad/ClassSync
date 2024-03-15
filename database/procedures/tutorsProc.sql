CREATE OR REPLACE PROCEDURE insertTutor(
    _tutor_id VARCHAR(50),
    _user_id INTEGER,
    _f_name VARCHAR(50),
    _l_name VARCHAR(50),
    _bio VARCHAR(500),
    _start_date DATE,
    _end_date DATE,
    _max_hours INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO tutors (tutor_id, user_id, f_name, l_name, bio, startDate, endDate, max_hours)
    VALUES (_tutor_id, _user_id, _f_name, _l_name, _bio, _start_date, _end_date, _max_hours);
END;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteTutor(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM tutors
    WHERE tutor_id = _tutor_id;
END;
END;
$$;

CREATE OR REPLACE PROCEDURE upsertTutor(
    _tutor_id VARCHAR(50),
    _f_name VARCHAR(50),
    _l_name VARCHAR(50),
    _bio VARCHAR(500),
    _start_date DATE,
    _end_date DATE,
    _max_hours INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT * FROM tutors WHERE tutor_id = _tutor_id) THEN
        INSERT INTO tutors (tutor_id, f_name, l_name, bio, startDate, endDate, max_hours)
        VALUES (_tutor_id, _f_name, _l_name, _bio, _start_date, _end_date, _max_hours);
    ELSE
        UPDATE tutors
        SET        
            f_name = _f_name,
            l_name = _l_name,
            bio = _bio,
            startDate = _start_date,
            endDate = _end_date,
            max_hours = _max_hours
        WHERE tutor_id = _tutor_id;
    END IF;
END;
END;

CREATE OR REPLACE PROCEDURE getTutor(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM tutors
    WHERE tutor_id = _tutor_id;
END;
END;

-- Get All tutor IDs. 

CREATE OR REPLACE PROCEDURE getAllTutors()
LANGUAGE plpgsql
AS $$ 
BEGIN 
    SELECT tutor_id FROM tutors 
END; 
END; 