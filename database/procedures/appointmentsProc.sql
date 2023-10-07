
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
