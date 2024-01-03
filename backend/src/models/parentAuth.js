import con from "../../index.js";

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
          "CALL getUserByEmailAndRole($1, $2, $3)",
          [email, role, null],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              const hashedPassword = results.rows[0].password; // Retrieve hashed password from results
              resolve(hashedPassword); // Resolve with the hashed password
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
