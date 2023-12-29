import con from "../../index.js";

export class tutorRegistration {

    async getTutorOfferings(userID) {
        console.log("User ID ", userID);

        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'SELECT * FROM get_tutor_offerings($1)',
                    [userID],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log(results);
                            const resultsArray = results.rows.map(row => row.get_tutor_offerings);
                            resolve(resultsArray); // [5, 4]                        }
                        }

                    });
            });
        } finally {
            client.release();
        }
    }

    async getProfile(userID) {
        const client = await con.connect();
        try {
            console.log("User ID ", userID);
            return new Promise((resolve, reject) => {
                client.query(
                    'SELECT * FROM get_profile($1)',
                    [userID],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {

                            console.log(results);
                            console.log(results.rows[0]);
                            resolve(results.rows[0]);
                        }
                    }
                );
            });
        } finally {
            client.release();
        }
    }

    async createAccount(email, hashPassword, fname, lname) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL insertUser($1, $2, $3, $4, $5, $6)',
                    ['tutor', email, hashPassword, fname, lname, null],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const user_id = results.rows[0].id;  // Retrieve user_id from results
                            resolve(user_id);  // Resolve with the returned user_id
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

    async getPassword(email) {
        const client = await con.connect();
        let role = 'tutor'
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL getAccountByEmailAndRole($1, $2, $3, $4)',
                    [email, role, null, null],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const hashedPassword = results.rows[0].password;  // Retrieve hashed password from results
                            const user_id = results.rows[0]._user_id;  // Retrieve user_id from results
                            resolve({
                                hashedPassword: hashedPassword,
                                user_id: user_id
                            });  // Resolve with the hashed password
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



    async deleteAllOfferings(userID) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL deleteOfferingsByTutor($1)',
                    [userID],
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

    async addOfferings(userID, offerings) {
        const client = await con.connect();
        try {
            const promises = offerings.map((offering) => {
                return new Promise((resolve, reject) => {
                    client.query(
                        'CALL insert_offering($1, $2)',
                        [userID, offering],
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
            });

            return Promise.all(promises);
        } finally {
            client.release();
        }
    }

    async getOfferings(email) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL getOfferings($1)',
                    [email],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve(results.rows[0]);
                        }
                    }
                );
            });
        } finally {
            client.release();
        }
    }

    async updateBio(user_id, bio) {
        console.log(user_id, bio);
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL upsert_tutor($1, $2, $3, $4, $5, $6)',
                    [user_id, bio.about, bio.university, bio.maxHours, bio.startdate, bio.enddate],
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
}
