import con from "../../index.js";

export class tutor {
    

    async getAllTutors() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    "select t.*, u.firstname, u.lastname from tutors t join users u on u.user_id = t.tutor_id",
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

    async getTutorById(tutor_id) {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                con.query(
                    'SELECT * FROM tutors WHERE tutor_id = $1',
                    [tutor_id],
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

    async getAllTutorOfferings() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    "SELECT * FROM tutor_offerings",
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
}