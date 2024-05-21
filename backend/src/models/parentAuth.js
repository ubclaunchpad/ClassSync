import con from "../../app.js";

export default class parentAuth {
  async createUser(email, hashPassword, fname, lname) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL insertUser($1, $2, $3, $4, $5, $6)",
          ["guardian", email, hashPassword, fname, lname, null],
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
    let role = "guardian";
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

              console.log(results.rows[0])

              console.log("User id ", user_id, " Image ", picture)

              // Execute another SQL query
              client.query(
                "SELECT student_id, CONCAT(f_name, ' ', l_name) AS name FROM students WHERE guardian_id = $1",
                [user_id],
                (error, studentResults) => {
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
                      children: studentResults.rows, // Add the results of the second query to the object
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
}
