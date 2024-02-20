import con from "../../index.js";

export class courses {

    async shareFiles(booking_id, files) {
        const client = await con.connect()

        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL update_shared_files($1, $2)',
                    [booking_id, files],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve();  // Resolve with the returned result
                        }
                    }
                );
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            client.release();
        }
    }

    async getCourseFiles(enrollment_id) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'SELECT * FROM get_course_files($1)',
                    [enrollment_id],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const files = results.rows[0].get_course_files[0];  // Retrieve files from results
                            resolve(files);  // Resolve with the returned files
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

    async addLearningGoalProgress(enrollmentId, completed) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL upsert_learning_goals($1, $2)',
                    [enrollmentId, completed],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve();  // Resolve with the returned result
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
    
    async getLearningGoalProgress(enrollmentId) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'SELECT * FROM get_learning_goals_progress($1)',
                    [enrollmentId],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const progress = results.rows[0];  // Retrieve progress from results
                            resolve(progress);  // Resolve with the returned progress
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