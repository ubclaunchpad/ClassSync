CREATE OR REPLACE PROCEDURE addTutor(
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
    INSERT INTO "tutors" (user_id, f_name, l_name, bio, start_date, end_date, max_hours)
    VALUES (_user_id, _f_name, _l_name, _bio, _start_date, _end_date, _max_hours);
END;
$$;

CREATE OR REPLACE PROCEDURE deleteTutor(
    _id INT
)

LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "tutors"
    WHERE tutor_id = _id;
END;
$$;

CREATE OR REPLACE PROCEDURE updateBio(
    _id INT,
    _bio VARCHAR(500)
)

LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "tutors"
    SET bio = _bio
    WHERE tutor_id = _id;
END;
$$;