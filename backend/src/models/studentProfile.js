// Database con.query() for studentProfile table

export class studentProfile {
    insertStudentProfile(newStudentProfile, result) {
        con.query(
          "CALL save_student_profile(?, ?, ?, ?, ?, ?, ?)",
          [
            newStudentProfile.student_id,
            newStudentProfile.first_name,
            newStudentProfile.last_name,
            newStudentProfile.birthday,
            newStudentProfile.accomodations,
            newStudentProfile.neurodivergent, // possible boolean field along with others?
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
        con.query(`CALL delete_student_profile(?)`, [id], (err, res) => {
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