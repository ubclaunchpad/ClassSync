
-- Side by side bar graph 
-- Current year and previous year for each month
SELECT EXTRACT(YEAR FROM registration_date) AS year,
       TO_CHAR(registration_date, 'Mon') AS month,
       COUNT(*) AS registrations
FROM enrollments
WHERE EXTRACT(YEAR FROM registration_date) IN (EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE) - 1)
GROUP BY EXTRACT(YEAR FROM registration_date), TO_CHAR(registration_date, 'Mon')
ORDER BY EXTRACT(YEAR FROM registration_date), EXTRACT(MONTH FROM MIN(registration_date));



-- Group enrollments by year - ascending order
SELECT EXTRACT(YEAR FROM registration_date) AS year,
       COUNT(*) AS registrations
FROM enrollments
GROUP BY EXTRACT(YEAR FROM registration_date)
ORDER BY EXTRACT(YEAR FROM registration_date);




-- Given year, group number of enrollments by month (replace 2024)
SELECT TO_CHAR(registration_date, 'Mon') AS month,
       COUNT(*) AS registrations
FROM enrollments
WHERE EXTRACT(YEAR FROM registration_date) = 2024
GROUP BY TO_CHAR(registration_date, 'Mon')
ORDER BY EXTRACT(MONTH FROM MIN(registration_date));
