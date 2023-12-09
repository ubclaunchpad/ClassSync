// Database con.query() for studentProfile table
//import con from "../config/database.js";

import con from "../../index.js";

export class StudentProfile {
    getStudentProfiles(result) {
    con.query("SELECT * FROM loadStudentProfiles()", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.rows);
        result(null, res.rows); 
      }
    });
  }

    insertStudentProfile(newStudentProfile, result) {
        con.query(
          "CALL insertStudent($1, $2, $3, $4, $5)",
          [
            newStudentProfile.first_name,
            newStudentProfile.last_name,
            newStudentProfile.birthday,
            newStudentProfile.accomodations,
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
        con.query(`CALL deleteStudent($1)`, [id], (err, res) => {
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
        con.query(
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