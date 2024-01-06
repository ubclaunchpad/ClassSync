export default class TutorProfile {
  async getTutorCourses(tutorId) {
    const client = await pgPool.connect();
    try {
      return new Promise((resolve, reject) => {
        // First, get the courseIds from the tutorId -> Which courses does the tutor teach
        con.query("CALL getCoursesByTutor($1)", [tutorId], (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // Second, get the coruse information from the courseIDs --> For each course that the tutor teaches
            const courses = results.map((courseId) => {
              con.query(
                "CALL getCourseByCourseId($1)",
                [courseId],
                (error, results) => {
                  if (error) {
                    return null;
                  } else {
                    return results;
                  }
                }
              );
            });
            resolve(courses);
          }
        });
      });
    } finally {
      client.release();
    }
  }
}
