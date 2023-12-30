import con from "../../index.js";


export class tutorAvailability {

    async getSchedule(userID, startDate) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'SELECT * FROM get_tutor_availability($1, $2)',
                    [userID, startDate],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log("Got schedule ", results);
                            resolve(results.rows[0].get_tutor_availability);
                        }
                    }
                );
            }
            );
        } finally {
            client.release();
        }
    }

    async getRecurringAvailability(userID) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'SELECT * FROM get_recurring_availability($1)',
                    [userID],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log("Results ", results);
                            resolve(results.rows[0].get_recurring_availability);
                        }
                    }
                );
            });

        }
        finally {
            client.release();
        }
    }


    async setRecurringAvailability(userID, patternID) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL insert_recurring_availability($1, $2)',
                    [userID, patternID],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log("Inserted recurring availability")
                            resolve();
                        }
                    }
                );
            });

        } finally {
            client.release();
        }
    }

    async getDates(userID) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'SELECT * FROM get_tutor_dates($1);',
                    [userID],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            console.log("Results ", results);
                            resolve(results.rows[0]);
                        }
                    }
                );
            });

        } finally {
            client.release();
        }
    }
    async createAvailabilityPattern(availability) {
        const client = await con.connect();
        console.log("Creating availability pattern")
        // const avail = "ARRAY[ROW(ARRAY['8:00', '8:30']::character varying[])::public.\"TimesArr\", ROW(ARRAY['9:00', '9:30']::character varying[])::public.\"TimesArr\"]";
        // const avail = { 0: ["8:00", "8:30"], 1: ["9:00", "9:30"], 2: [], 3: [], 4: [], 5: [], 6: [] };
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL insert_availability_pattern($1, $2)',
                    [availability, null],
                    (error, results) => {
                        console.log("Results ", results);
                        console.log("Error ", error);
                        if (error) {
                            console.error('throwing error:', error);
                            reject(error);
                            // Handle the error
                        } else {
                            // Access the pattern_id from the results
                            console.log("Inside results");
                            const patternId = results.rows[0].id;
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
        const client = await con.connect();
        const weeksParsed = JSON.parse(weeks);

        try {
            const promises = weeksParsed.map((week) => {
                return new Promise((resolve, reject) => {
                    console.log(week.start_date, week.end_date);
                    con.query(
                        'CALL insert_tutor_availability($1, $2, $3, $4)',
                        [userID, week.start_date, week.end_date, patternID],
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

    async updateAvailability(userID, start_date, pattern_id, at_capacity) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL update_tutor_availability(?, ?, ?, ?)',
                    [userID, start_date, pattern_id, at_capacity],
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

    async getTutorAvailability(tutorId, startDate) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL getAvailabilitiesByTutor(?, ?)',
                    [tutorId, startDate],
                    (error, results) => {
                        if (error) {
                            console.error('Error:', error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

        } finally {
            client.release();
        }

    }

    async deleteAvailability(tutorId, startDate, endDate) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'CALL deleteTutorAvailabilityByWeek(?, ?, ?)',
                    [tutorId, startDate, endDate],
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