import con from "../../index.js";

export class courses {
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