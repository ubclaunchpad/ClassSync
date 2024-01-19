import con from "../../index.js";

export default class adminAuth {
  async createUser(email, hashPassword, fname, lname) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL insertUser($1, $2, $3, $4, $5, $6)",
          ["admin", email, hashPassword, fname, lname, null],
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
    let role = "admin";
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL get_user_by_email_and_role($1, $2, $3, $4, $5, $6)",
          [email, role, null, null, null, null],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              const hashedPassword = results.rows[0].password; // Retrieve hashed password from results
              const user_id = results.rows[0]._user_id;
              const firstName = results.rows[0]._firstname;
              const lastName = results.rows[0]._lastname;
              resolve({
                hashedPassword: hashedPassword,
                user_id: user_id,
                firstName: firstName,
                lastName: lastName,
              });
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
