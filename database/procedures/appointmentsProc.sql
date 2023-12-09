
-- Procedure to add an appointment.
CREATE OR REPLACE PROCEDURE add_appointment(
    _student_id VARCHAR(50),
    _tutor_id VARCHAR(50),
    _course_id VARCHAR(50),
    _appointment_start TIMESTAMP,
    _duration INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO appointments (
        student_id,
        tutor_id,
        course_id,
        appointment_start,
        duration
    ) VALUES (
        _student_id,
        _tutor_id,
        _course_id,
        _appointment_start,
        _duration
    );

--- Check if tutor's max hours for that week have been reached if they have, then set at capacity to true
    -- Get the tutor's max hours
    DECLARE max_hours INT;
    SELECT max_hours INTO max_hours FROM tutors WHERE tutor_id = _tutor_id;

    -- Get the tutor's start date for the week
    DECLARE start_date TIMESTAMP;
    SELECT start_date INTO start_date FROM tutor_availability WHERE tutor_id = _tutor_id and startDate <= _appointment_start and endDate >= _appointment_start;

    -- Get the tutor's end date for the week
    DECLARE end_date TIMESTAMP;
    SELECT end_date INTO end_date FROM tutor_availability WHERE tutor_id = _tutor_id and startDate <= _appointment_start and endDate >= _appointment_start;

    -- Get the tutor's current hours for the week
    DECLARE current_hours INT;
    SELECT SUM(duration) INTO current_hours FROM appointments WHERE tutor_id = _tutor_id and appointment_start >= start_date and appointment_start <= end_date;

    -- If the tutor's current hours for the week are greater than or equal to the max hours, set at_capacity to true
    IF current_hours >= max_hours THEN
        UPDATE tutor_availability SET at_capacity = true WHERE tutor_id = _tutor_id and startDate = start_date;
    END IF;



END;
$$;
-- Procedure to check if the guardian if booking for their student.
CREATE OR REPLACE PROCEDURE check_student_guardian(
    _student_id INT,
    _guardian_id INT,
    OUT is_matching_guardian BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the guardian ID matches the guardian ID of the specified student
    SELECT TRUE INTO is_matching_guardian
    FROM students
    WHERE student_id = _student_id AND guardian_id = _guardian_id;

    -- If there is no match, set is_matching_guardian to FALSE
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        is_matching_guardian := FALSE;
END;
$$;

-- Procedure to update an appointment.
CREATE OR REPLACE PROCEDURE update_appointment(
    _appointment_id INT,
    _student_id VARCHAR(50),
    _tutor_id VARCHAR(50),
    _course_id VARCHAR(50),
    _appointment_start TIMESTAMP,
    _duration INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE appointments
    SET
        student_id = _student_id,
        tutor_id = _tutor_id,
        course_id = _course_id,
        appointment_start = _appointment_start,
        duration = _duration
    WHERE appointment_id = _appointment_id;
END;
$$;

-- Procedure to delete an appointment.
CREATE OR REPLACE PROCEDURE delete_appointment(
    _id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM appointments
    WHERE appointment_id = _id;
END;
$$;

-- Procedure to get appointments by tutor.
CREATE OR REPLACE PROCEDURE get_appointments_by_tutor(
    _tutor_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM appointments WHERE tutor_id = _tutor_id;
END;
$$;

-- Procedure to get appointments by student.
CREATE OR REPLACE PROCEDURE get_appointments_by_student(
    _student_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM appointments WHERE student_id = _student_id;
END;
$$;

-- Procedure to get appointments by course.
CREATE OR REPLACE PROCEDURE get_appointments_by_course(
    _course_id VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM appointments WHERE course_id = _course_id;
END;
$$;

-- Procedure to get appointments within a date range.
CREATE OR REPLACE PROCEDURE get_appointments_in_week(
    _startdate TIMESTAMP,
    _enddate TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM appointments WHERE appointment_start BETWEEN _startdate AND _enddate;
END;
$$;

-- Procedure to get all appointments.
CREATE OR REPLACE PROCEDURE get_all_appointments()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM appointments;
END;
$$;
