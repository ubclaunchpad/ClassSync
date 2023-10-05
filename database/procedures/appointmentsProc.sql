DROP PROCEDURE IF EXISTS `addAppointment`;

DELIMITER $$


CREATE PROCEDURE `addAppointment` (
    IN `_student_id` VARCHAR(50),
    IN `_tutor_id` VARCHAR(50),
    IN `_course_id` VARCHAR(50),
    IN `_duration` INT,
    IN `_appointment_start` DATETIME
)
BEGIN 
    INSERT INTO `appointments` (
        `student_id`,
        `tutor_id`,
        `course_id`,
        `duration`,
        `appointment_start`
    ) VALUES (
        _student_id,
        _tutor_id,
        _course_id,
        _duration,
        _appointment_start
    );
END$$



CREATE PROCEDURE `updateAppointment` (
    IN `_appointment_id` INT,
    IN `_student_id` VARCHAR(50),
    IN `_tutor_id` VARCHAR(50),
    IN `_course_id` VARCHAR(50),
    IN `_duration` INT,
    IN `_appointment_start` DATETIME
) 
BEGIN
    UPDATE `appointments` SET
        `student_id` = _student_id,
        `tutor_id` = _tutor_id,
        `course_id` = _course_id,
        `duration` = _duration,
        `appointment_start` = _appointment_start
    WHERE `appointment_id` = _appointment_id;
END$$


DELIMITER ;