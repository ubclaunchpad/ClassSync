import con from "../../index.js";

export class tutor {
    
    async getAllTutors() {
        const client = await con.connect();
        try {
            return new Promise((resolve, reject) => {
                client.query(
                    "SELECT * FROM tutors",
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

    async getStudentsByGuardian(id) {
        const client = await con.connect();
        try {
          return new Promise((resolve, reject) => {
            client.query("SELECT * FROM get_students_by_guardian($1)", [id], (error, results) => {
              if (error) {
                console.error("Error:", error);
                reject(error);
              } else {
                console.log(results.rows);
                resolve(results.rows);
              }
            });
          });
        } catch (err) {
          console.log(err);
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
}