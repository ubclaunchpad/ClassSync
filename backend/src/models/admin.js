import con from "../../index.js";

export class admin {

    getCourses() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * from public.get_course_details()`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    console.log(res.rows)
                    resolve(res.rows);
                }
            });
        })
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