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

DELIMITER ;