import { pgPool } from '../../index.js';


export class tutorAvailability {
    async createAvailabilityPattern(availability) {
        const client = await pgPool.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL insertNewPattern($1)',
                    [availability],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error)
                            // Handle the error
                        } else {
                            // Access the pattern_id from the results
                            const patternId = results[0][0];
                            console.log('Pattern ID:', patternId);
                            resolve(patternId);
                        }
                    }
                );
            });

        } finally {
            client.release();
        }

    }

    async setAvailabilityForWeeks(userID, weeks, patternID) {
        const client = await pgClient.connect();

        try {
            const promises = weeks.map((week) => {
                return new Promise((resolve, reject) => {
                    con.query(
                        'CALL upsertTutorAvailability($1, $2, $3)',
                        [userID, week, patternID],
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

            // Use Promise.all to wait for all setAvailability calls to complete
            await Promise.all(promises);
        } finally {
            client.release();
        }
    }

}