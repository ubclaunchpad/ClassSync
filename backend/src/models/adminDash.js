import con from "../../index.js"

export class adminDash {
    getClassHistory() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    CONCAT(c.course_name, ' ', c.course_difficulty) AS course,
                    b.booking_id,
                    b.start_time,
                    b.status,
                    u.firstname AS tutor,
                    CONCAT(s.f_name, ' ', s.l_name) AS student,
                    (
                        SELECT COUNT(*)+1
                        FROM bookings b2
                        WHERE b2.enrollment_id = b.enrollment_id
                          AND b2.start_time < b.start_time
                    ) AS session
                FROM 
                    bookings b
                JOIN 
                    enrollments e ON b.enrollment_id = e.enrollment_id
                JOIN 
                    users u ON u.user_id = b.tutor_id
                JOIN 
                    students s ON s.student_id = e.student_id
                JOIN 
                    courses c ON c.course_id = e.course_id
                WHERE
                    b.start_time < NOW()
                ORDER BY 
                    b.start_time;
            `;

            con.query(sql, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    return resolve(res.rows);
                }
            });
        });
    }

}