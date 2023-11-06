DROP TABLE IF EXISTS "availability_patterns";
DROP TABLE IF EXISTS "tutor_availability";
CREATE OR REPLACE PROCEDURE createAvailabilities()


LANGUAGE plpgsql 
AS $$

-- JSON Format will be as follows:
-- {DayOfWeek: [(StartTime, EndTime)], DayOfWeek: [(StartTime, EndTime)], ...}
CREATE TABLE availability_patterns (
	pattern_id SERIAL NOT NULL PRIMARY KEY,
	times JSON
);

CREATE TABLE tutor_availability (
	tutor_id varchar(50),
	startDate TIMESTAMP,
	endDate TIMESTAMP,
	pattern_id INT,
	at_capacity BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (tutor_id, start_date),
	FOREIGN KEY (pattern_id) REFERENCES availability_patterns(pattern_id)
	FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id)
);