import con from "../../index.js";

export class tutorRegistration {
  async renewTutors(tutors, enddate) {

    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        let query = `UPDATE public.tutors
        SET enddate = '${enddate}'
        WHERE tutor_id = ANY(ARRAY[${tutors.join(',')}]);`;


        client.query(
          `UPDATE public.tutors
          SET enddate = $1
          WHERE tutor_id = ANY($2::int[]);`,
          [enddate, tutors],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              console.log("Success")
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async getTutorOfferings(userID) {

    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM get_tutor_offerings($1)",
          [userID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log(results);
              const resultsArray = results.rows.map(
                (row) => row.get_tutor_offerings
              );
              resolve(resultsArray); // [5, 4]                        }
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getFullProfile(userID) {
    const client = await con.connect();
    try {
      const tutorProfilePromise = client.query(
        "SELECT t.*, u.firstname, u.lastname, u.image FROM tutors t JOIN users u ON u.user_id = t.tutor_id WHERE tutor_id = $1  ",
        [userID]
      );

      const coursesPromise = client.query(
        "SELECT STRING_AGG(DISTINCT LOWER(REGEXP_REPLACE(c.course_name, '\\s+$', '', 'g')), ', ') AS course_list FROM courses c JOIN tutor_offerings o ON o.course_id = c.course_id WHERE o.tutor_id = $1",
        [userID]
      );

      const [tutorProfileResult, coursesResult] = await Promise.all([tutorProfilePromise, coursesPromise]);

      if (tutorProfileResult.rows.length > 0 && coursesResult.rows.length > 0) {
        const tutorProfile = tutorProfileResult.rows[0];
        const course_list = coursesResult.rows[0].course_list;
        const newObject = { ...tutorProfile, course_list };
        console.log(newObject);
        return newObject;
      } else {
        throw new Error('No data found');
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async getProfile(userID) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM get_profile($1)",
          [userID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log(results);
              // console.log(results.rows[0]);
              resolve(results.rows[0]);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getAllTutors() {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_all_tutors()", (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // console.log(results);
            resolve(results.rows);
          }
        });
      });
    } finally {
      client.release();
    }
  }

  async createAccount(email, hashPassword, fname, lname, image, role) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        // console.log(
        //   `Email: ${email}, Password: ${hashPassword}, First Name: ${fname}, Last Name: ${lname}`
        // );
        client.query(
          "CALL insertUser($1, $2, $3, $4, $5, $6, $7)",
          [role, email, hashPassword, fname, lname, image, null],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              const user_id = results.rows[0].id; // Retrieve user_id from results
              resolve(user_id); // Resolve with the returned user_id
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  }

  async getPassword(email) {
    const client = await con.connect();
    let role = "tutor";
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL get_user_by_email_and_role($1, $2, $3, $4, $5, $6, $7)",
          [email, role, null, null, null, null, null],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              const hashedPassword = results.rows[0].password; // Retrieve hashed password from results
              const user_id = results.rows[0]._user_id;
              const firstName = results.rows[0]._firstname;
              const lastName = results.rows[0]._lastname;
              const picture = results.rows[0]._picture;

              // Execute another SQL query
              client.query(
                "SELECT t.course_id, CONCAT(c.course_name, ' - ', c.course_difficulty) AS name FROM tutor_offerings t JOIN courses c ON t.course_id = c.course_id WHERE t.tutor_id = $1",
                [user_id],
                (error, courseResults) => {
                  if (error) {
                    console.error("Error:", error);
                    reject(error);
                  } else {
                    // Resolve the promise with an object containing all the user data
                    resolve({
                      hashedPassword: hashedPassword,
                      user_id: user_id,
                      firstName: firstName,
                      lastName: lastName,
                      picture: picture,
                      courses: courseResults.rows, // Add the results of the second query to the object
                    });
                  }
                }
              );
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  }

  async getDatesByTutor(id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT startdate, enddate FROM tutors WHERE tutor_id = $1",
          [id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows[0]); // Resolve the promise with the query results
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  }

  async deleteAllOfferings(userID) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL deleteOfferingsByTutor($1)",
          [userID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
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
            "CALL insert_offering($1, $2)",
            [userID, offering],
            (error, results) => {
              if (error) {
                console.error("Error:", error);
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

  async getLogs() {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(`
          SELECT 
            c.change_time as time,
            c.event_time as event,
            c.enrollment,
            c.action,
            c.tutor_id,
            CONCAT(u.firstname, ' ', u.lastname) AS tutor, 
            CONCAT(s.f_name, ' ', s.l_name) AS student 
          FROM 
            change_log c
          JOIN 
            users u ON c.tutor_id = u.user_id
          JOIN 
            enrollments e ON e.enrollment_id = c.enrollment
          JOIN 
            students s ON s.student_id = e.student_id
          ORDER BY 
            c.change_time DESC
        `, [], (error, results) => {
          // Handle the results here
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(results.rows);
          }
        });
      });

    } finally {
      client.release();
    }
  }
  async addLog(data) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("INSERT INTO public.change_log(change_time, tutor_id, action, event_time, enrollment) VALUES ($1, $2, $3, $4, $5);", [data.change_time, data.tutor_id, data.action, data.event_time, data.enrollment], (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(results.rows[0]);
          }
        });
      });
    } finally {
      client.release();
    }
  }
  async getOfferings(email) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("CALL getOfferings($1)", [email], (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(results.rows[0]);
          }
        });
      });
    } finally {
      client.release();
    }
  }

  // $8 add to CALL to make the link
  async updateBio(user_id, bio) {
    console.log(user_id, bio);
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL upsert_tutor($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
          [
            user_id,
            bio.about,
            bio.university,
            bio.major,
            bio.maxHours,
            bio.startdate,
            bio.enddate,
            bio.description,
            bio.teleport_link,
            bio.languages
          ],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
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

