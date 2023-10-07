CREATE OR REPLACE PROCEDURE getAllAvailabilites()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT ta.tutor_id, ta.start_date, ap.times
    FROM tutor_availability ta
    INNER JOIN availability_patterns ap ON ta.pattern_id = ap.pattern_id;
END;

CREATE OR REPLACE PROCEDURE getAvailabilitiesByTutor(_tutor_id varchar(50))
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT ta.tutor_id, ta.start_date, ap.times
    FROM tutor_availability ta
    INNER JOIN availability_patterns ap ON ta.pattern_id = ap.pattern_id
    WHERE ta.tutor_id = _tutor_id;
END;
$$;

CREATE OR REPLACE PROCEDURE getAvailabilitiesByDateRange(
    _start_date TIMESTAMP,
    _end_date TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT ta.tutor_id, ta.start_date, ap.times
    FROM tutor_availability ta
    INNER JOIN availability_patterns ap ON ta.pattern_id = ap.pattern_id
    WHERE ta.start_date >= _start_date AND ta.start_date <= _end_date;
END;
$$;

CREATE OR REPLACE PROCEDURE insertTutorAvailability(
    _tutor_id VARCHAR(50),
    _start_date TIMESTAMP,
    _pattern_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO tutor_availability (tutor_id, start_date, pattern_id)
    VALUES (_tutor_id, _start_date, _pattern_id);
END;
$$;

CREATE OR REPLACE PROCEDURE updateTutorAvailabilityByTutorAndDate(
    _tutor_id VARCHAR(50),
    _start_date TIMESTAMP,
    _new_pattern_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tutor_availability
    SET pattern_id = _new_pattern_id
    WHERE tutor_id = _tutor_id AND start_date = _start_date;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteTutorAvailabilityByDateRange(
    _start_date TIMESTAMP,
    _end_date TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM tutor_availability
    WHERE start_date >= _start_date AND start_date <= _end_date;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteTutorAvailabilityByTutor(_tutor_id VARCHAR(50))
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM tutor_availability
    WHERE tutor_id = _tutor_id;
END;
$$;


CREATE OR REPLACE PROCEDURE insertNewPattern(_times JSON, OUT _pattern_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO availability_patterns (times)
    VALUES (_times)
    RETURNING pattern_id INTO _pattern_id;
END;
$$;


CREATE OR REPLACE PROCEDURE deleteUnusedAvailabilityPatterns()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Delete rows from availability_patterns that have no references in tutor_availability
    DELETE FROM availability_patterns
    WHERE pattern_id NOT IN (SELECT DISTINCT pattern_id FROM tutor_availability);
END;
$$;


