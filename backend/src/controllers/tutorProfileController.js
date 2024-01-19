import TutorProfile from "../models/tutorProfile.js";

export default class TutorProfileController {
  // constructor() {
  //   this.tutorProfile = new TutorProfile();
  // }
  getCoursesByTutorId(tutorId) {
    console.log("got here", tutorId);
    return new Promise((resolve, reject) => {
      const tutorProfile = new TutorProfile();
      tutorProfile.getCoursesByTutorId(tutorId).then((courses) => {
        // // tutorProfile.getCoursesByCourseIds(courseIds).then((courses) => {
        // const courseList = courses.map((course) => {
        //   return `${course.difficulty} ${course.courseName}`;
        // });
        console.log("These are the courses", courses);
        resolve(courses);
        // });
      });
    });
  }
}
