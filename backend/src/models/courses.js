import con from "../../index.js";

export class courses {
async getBookingInfo(booking_id) {
    const client = await con.connect();
    try {
        return new Promise((resolve, reject) => {
            client.query(
                'SELECT * from public.get_booking_info($1)',
                [booking_id],
                (error, results) => {
                    if (error) {
                        console.error('Error:', error);
                        reject(error);
                    } else {
                        const course = results.rows[0];  // Retrieve course from results
                        resolve(course);  // Resolve with the returned course
                    }
                }
            );
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        client.release();
    }
}

    async getAllOfferings() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'SELECT * FROM getCourses()',
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const courses = results.rows;  // Retrieve courses from results
                            resolve(courses);  // Resolve with the returned courses
                        }
                    }
                );
            });
        } catch (err) {
            console.log(err);
        }
        finally {
            client.release();
        }
    }
}