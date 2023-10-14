DROP TABLE IF EXISTS "courses";
CREATE OR REPLACE PROCEDURE createCourses()

LANGUAGE plpgsql 
AS $$
BEGIN

CREATE TYPE course_difficulty AS ENUM  ('Easy', 'Medium', 'Hard')

CREATE TABLE "courses" (
    course_id SERIAL NOT NULL PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    course_difficulty course_difficulty NOT NULL,
    course_description VARCHAR(255) NOT NULL,
);

END;
$$;