import { resolve } from "path";
import con from "../../index.js";

export class admin {
    saveToken(token) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO tokens (token_value) VALUES ($1)`, [token], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    }

    getClasses(enrollmentId) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT b.booking_id, b.start_time, u.firstname || ' ' || u.lastname as tutor_name 
            FROM bookings b
            JOIN users u ON u.user_id = b.tutor_id
            WHERE enrollment_id = $1;`, [enrollmentId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    }

    validateToken(token) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM tokens WHERE token_value = $1`, [token], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    if (res.rowCount > 0) {
                        resolve(); // If the token exists, the function resolves with true
                    } else {
                        reject(new Error('Token does not exist')); // If the token doesn't exist, the function rejects with an error
                    }
                }
            });
        });
    }
    deleteToken(token) {
        return new Promise((resolve, reject) => {
            con.query(`DELETE FROM tokens WHERE token_value = $1`, [token], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    addTutorsToCourse(course_id, tutor_ids) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < tutor_ids.length; i++) {
                con.query(`INSERT INTO tutor_offerings (course_id, tutor_id) VALUES ($1, $2)`, [course_id, tutor_ids[i]], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }
        });
    }

    removeTutorsFromCourse(course_id) {
        return new Promise((resolve, reject) => {
            con.query(`DELETE FROM tutor_offerings WHERE course_id = $1`, [course_id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    getTutors() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT
            t.tutor_id,	
            t.startdate,
            t.enddate,
            t.max_hours,
            t.university,
            t.link,
            t.languages,
            t.major,
            CONCAT(U.firstname, ' ', U.lastname) AS tutor_name,
            u.email
        FROM
            tutors t
        JOIN
            users U ON t.tutor_id = U.user_id
            `;

            con.query(query)
                .then(result => {
                    resolve(result.rows);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    getCourseTutorMap() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT tutor_id, ARRAY_AGG(course_id) AS course_ids
                FROM tutor_offerings
                GROUP BY tutor_id
            `;

            con.query(query)
                .then(result => {
                    resolve(result.rows);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    getCheckedTutors(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT tutor_id FROM tutor_offerings WHERE course_id = $1`, [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    }

    addCourse(body) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO public.courses(
                course_name, course_difficulty, course_description, color, target_age, prerequisites, image, info_page, learning_goals, files)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING course_id;`,
                [body.name, body.difficulty, body.description, body.color, body.age, body.prerequisites, body.image, body.info_page, body.learning_goals, body.files],
                function (err, result) {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        // console.log("Result is ", result)
                        resolve(result.rows[0]);
                    }
                }
            );
        });
    }

    viewCourse(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM public.courses WHERE course_id = $1`, [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            });
        });
    }

    editCourse(body) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE public.courses
            SET course_name=$2, course_difficulty=$3, course_description=$4, color=$5, target_age=$6, prerequisites=$7, image=$8, info_page=$9, learning_goals=$10, files=$11
            WHERE course_id=$1`, [body.id, body.name, body.difficulty, body.description, body.color, body.age, body.prerequisites, body.image, body.info_page, body.learning_goals, body.files], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    deleteCourse(id) {
        return new Promise((resolve, reject) => {
            con.query(`DELETE FROM public.courses WHERE course_id = $1`, [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    getCourses() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * from public.get_course_details()`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    // console.log(res.rows)
                    resolve(res.rows);
                }
            });
        })
    }

    async getAllUsers() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    "SELECT * FROM users",
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log(results.rows);
                            resolve(results.rows);
                        }
                    }
                );
            });
        } finally {
            client.release();
        }
    }

    getAvailabilityById(id, result) {
        return new Promise((resolve, reject) => {
            //get the availability of tutor by id
            con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res[0]);

                }
            });
        })
    }

    async updatePaymentStatus(id, status) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL update_payment_status($1, $2)',
                    [id, status],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        } finally {
            client.release();
        }
    }
    async getRegistrations() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'SELECT * FROM get_registrations()',
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve(results.rows);
                        }
                    }
                );
            });
        } finally {
            client.release();
        }
    }


    getAllFutureAvailability(result) {
        //get the availability in the future
        con.query(`CALL getAvailabilitiesByDateRange(?,?)`, [Date.now(), new Date(8.64e15)], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    getAvailabilityByCourse(course, result) {
        //get tutors by course
        con.query(`CALL getTutorsByCourse(?)`, [course], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                var ids = res[0].map(function (item) {
                    return item.id;
                });

                availabilities = [];

                ids.forEach(id => {
                    availabilities.push(con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        } else {
                            return res[0];
                        }
                    }));
                });

                result(null, availabilities);
            }
        });

        //get the availability of tutor by id

    }
}