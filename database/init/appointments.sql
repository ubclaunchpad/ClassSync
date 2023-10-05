USE `classsync`;

DROP TABLE IF EXISTS `appointments`;
DROP PROCEDURE IF EXISTS `createAppointments`;

DELIMITER $$

CREATE PROCEDURE `createAppointments` ()
BEGIN
CREATE TABLE `appointments` (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
	student_id VARCHAR(50) NOT NULL,
	tutor_id VARCHAR(50) NOT NULL,
	course_id VARCHAR(50) NOT NULL,
    appointment_start DATETIME NOT NULL,
    duration INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
END$$

DELIMITER ;


