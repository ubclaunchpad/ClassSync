CREATE TYPE course_difficulty AS ENUM  ('Beginner', 'Intermediate', 'Advanced');

CREATE OR REPLACE PROCEDURE createCourses()
LANGUAGE plpgsql 
AS $$
BEGIN
    -- Drop the table if it exists
    DROP TABLE IF EXISTS "courses";

    -- Create the table
    CREATE TABLE "courses" (
        course_id SERIAL NOT NULL PRIMARY KEY,
        course_name VARCHAR(50) NOT NULL,
        course_difficulty course_difficulty NOT NULL,
        course_description VARCHAR(255) NOT NULL
    );
END;
$$;