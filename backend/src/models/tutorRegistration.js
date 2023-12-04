import { pgPool } from '../../index.js';


export class tutorRegistration {
    async createAccount(email, hashPassword) {
        const client = await pgPool.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL insertUser($1, $2, $3, $4)',
                    [email, hashPassword, 'tutor', null],
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
        const client = await pgPool.connect();
        let role = 'tutor'
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL getUserByEmailAndRole($1, $2, $3)',
                    [email, role, null],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            const hashedPassword = results.rows[0].password;  // Retrieve hashed password from results
                            resolve(hashedPassword);  // Resolve with the hashed password
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
        const client = await pgPool.connect();
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
        const client = await pgPool.connect();
        try {
            const promises = offerings.map((offering) => {
                return new Promise((resolve, reject) => {
                    client.query(
                        'CALL insertOffering($1, $2)',
                        [userID, offering.courseID],
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
        const client = await pgPool.connect();
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

    async updateBio(email, bio) {
        const client = await pgPool.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    'CALL upsertTutor($1, $2, $3, $4, $5, $6, $7)',
                    [email, bio.firstName, bio.lastName, bio.aboutMe, bio.startDate, bio.endDate, bio.maxHours],
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
