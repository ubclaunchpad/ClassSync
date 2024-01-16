import TutorProfile from "../models/tutorProfile.js";

export default class TutorProfileController {
  getCoursesByTutorId(tutorId) {
    return new Promise((resolve, reject) => {
      const tutorProfile = new TutorProfile();
      tutorProfile.getCoursesByTutorId(tutorId).then((courseIds) => {
        tutorProfile.getCoursesByCourseIds(courseIds).then((courses) => {
          const courseList = courses.map((course) => {
            return `${course.difficulty} ${course.name}`;
          });
          console.log(courseList);
          resolve(courseList);
        });
      });
    });
  }
}
