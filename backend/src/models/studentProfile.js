// Database con.query() for studentProfile table
//import con from "../config/database.js";

import con from "../../server.js";

export class StudentProfile {

  async getStudentEnrollment(id) {
    const client = await con.connect();

    try {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT booking_id, link, start_time 
         FROM bookings b 
         JOIN enrollments e ON e.enrollment_id = b.enrollment_id
         JOIN tutors t ON b.tutor_id = t.tutor_id
         WHERE e.enrollment_id = $1`,
          [id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows);
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

  async getStudentsByGuardian(id) {
    const client = await con.connect();

    client.query("SELECT * FROM tutors", (error, results) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log(results.rows);
      }
    });
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_students_by_guardian($1)", [id], (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // console.log(results.rows);
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
  async addEnrollment(student_id, course_id, registration_date) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("CALL insert_enrollment($1, $2, $3)",
          [student_id, course_id, registration_date], (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log(results.rows);
              resolve();
            }
          });
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.release();
    }
  }
  async getStudentCourses(id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_student_courses($1)", [id], (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // console.log(results.rows);
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

  async getBookings(student_id, course_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM search_enrollments($1, $2)",
          [student_id, course_id], (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log(results.rows);
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

  async getBookingsByStudentId(student_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_enrollments_by_student_id_2($1)",
          [student_id], (error, results) => {
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

  async getBookingsByGuardianId(guardian_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_enrollments_by_guardian_id($1)",
          [guardian_id], (error, results) => {
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

  async getStudents() {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM get_students()", (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // console.log(results.rows);
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

  getStudentName(id, result) {
    return con.query(`SELECT f_name, l_name FROM students WHERE student_id = $1;`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.rows[0]);
      }
    });
  }


  getStudentProfiles(result) {
    return con.query("SELECT * FROM loadStudentProfiles()", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        // console.log(res.rows);
        result(null, res.rows);
      }
    });
  }

  insertStudentProfile(newStudentProfile, result) {
    return con.query(
      "CALL insertstudent1($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        newStudentProfile.first_name,
        newStudentProfile.last_name,
        newStudentProfile.birthday,
        newStudentProfile.grade,
        newStudentProfile.city,
        newStudentProfile.province,
        newStudentProfile.pronouns,
        newStudentProfile.color,
        newStudentProfile.accommodations,
        newStudentProfile.fk_parent_id,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Student ${results.student_id} Saved Successfully`,
          });
        }
      }
    );
  }

  deleteStudentProfile(id, result) {
    return con.query(`CALL deleteStudent($1)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  //  update function, replicate for each student profile field
  updateFirstName(studentProfile, result) {
    return con.query(
      "CALL update_first_name(?, ?)",
      [
        studentProfile.student_id,
        studentProfile.first_name
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
        } else {
          result(null, {
            result: `Student ${studentProfile.first_name} Updated Successfully`,
          });
        }
      }
    );
  }
}