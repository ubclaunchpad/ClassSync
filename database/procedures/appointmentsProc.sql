USE 'classsync'

DROP PROCEDURE IF EXISTS `addAppointment`;

DELIMITER $$


CREATE PROCEDURE `addAppointment` (
    IN `_student_id` VARCHAR(50),
    IN `_tutor_id` VARCHAR(50),
    IN `_course_id` VARCHAR(50),
    IN `_appointment_start` DATETIME,
    IN `_duration` INT,
)
BEGIN 
    INSERT INTO `appointments` (
        `student_id`,
        `tutor_id`,
        `course_id`,
        `appointment_start`,
        `duration`
    ) VALUES (
        _student_id,
        _tutor_id,
        _course_id,
        _appointment_start,
        _duration
    );
END$$



CREATE PROCEDURE `updateAppointment` (
    IN `_appointment_id` INT,
    IN `_student_id` VARCHAR(50),
    IN `_tutor_id` VARCHAR(50),
    IN `_course_id` VARCHAR(50),
    IN `_appointment_start` DATETIME,
    IN `_duration` INT,
) 
BEGIN
    UPDATE `appointments` SET
        `student_id` = _student_id,
        `tutor_id` = _tutor_id,
        `course_id` = _course_id,
        `appointment_start` = _appointment_start
        `duration` = _duration
    WHERE `appointment_id` = _appointment_id;
END$$


CREATE PROCEDURE `deleteAppointment`  (
    IN id INT
)
BEGIN
    DELETE FROM appointments WHERE appointment_id = id;
END $$



CREATE PROCEDURE `getAppointmentsByTutor` (
    IN tutor_id VARCHAR(50)
) 
BEGIN
    SELECT * FROM appointments WHERE tutor_id = tutor_id;
END$$

CREATE PROCEDURE `getAppointmentsBYStudent` (
    IN student_id VARCHAR(50)
)
BEGIN
    SELECT * FROM appointments WHERE student_id = student_id;
END$$

CREATE PROCEDURE `getAppointmentsByCourse` (
    IN course_id VARCHAR(50)
)
BEGIN
    SELECT * FROM appointments WHERE course_id = course_id;
END$$

CREATE PROCEDURE `getAppointmentsInWeek` (
    IN startdate DATETIME,
    IN enddate DATETIME
)
BEGIN
    SELECT * FROM appointments WHERE appointment_start BETWEEN startdate AND enddate;
END$$

CREATE PROCEDURE `getAllAppointments` ()
BEGIN
    SELECT * FROM appointments;
END$$
CREATE PROCEDURE `deleteAppointment`  (
    IN id INT
)
BEGIN
    DELETE FROM appointments WHERE appointment_id = id;
END $$


CREATE PROCEDURE `getAppointmentsByTutor` (
    IN tutor_id VARCHAR(50)
) 
BEGIN
    SELECT * FROM appointments WHERE tutor_id = tutor_id;
END$$

CREATE PROCEDURE `getAppointmentsByStudent` (
    IN student_id VARCHAR(50)
)
BEGIN
    SELECT * FROM appointments WHERE student_id = student_id;
END$$

CREATE PROCEDURE `getAppointmentsByCourse` (
    IN course_id VARCHAR(50)
)
BEGIN
    SELECT * FROM appointments WHERE course_id = course_id;
END$$

CREATE PROCEDURE `getAppointmentsInWeek` (
    IN startdate DATETIME,
    IN enddate DATETIME
)
BEGIN
    SELECT * FROM appointments WHERE appointment_start BETWEEN startdate AND enddate;
END$$

CREATE PROCEDURE `getAllAppointments` ()
BEGIN
    SELECT * FROM appointments;
END$$


DELIMITER ;