// Methods called from the route are here, any db calls are made from here to the queries in models
import { StudentProfile } from "../models/studentProfile.js";

export default class studentProfileController {

  getStudentCourses(id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getStudentCourses(id).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      // return err;
    });
  }

  getBookings(student_id, course_id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getBookings(student_id, course_id).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      throw err;
      // return err;
    });
  }

  getStudents() {
    const studentProfileModel = new StudentProfile();


    return studentProfileModel.getStudents().then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      // return err;
    });
  }

  getStudentProfile(id) {
    return new Promise((resolve, reject) => {
      const studentProfileModel = new StudentProfile();

      studentProfileModel.getStudentProfiles((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveStudentProfile(req) {
    return new Promise((resolve, reject) => {
      const studentProfileModel = new StudentProfile();

      const studentProfile = {
        first_name: req.body.f_name,
        last_name: req.body.l_name,
        birthday: req.body.dob,
        accomodations: req.body.accomodations,
        fk_parent_id: req.body.fk_guardian_id
      };

      studentProfileModel.insertStudentProfile(studentProfile, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteStudentProfile(id) {
    return new Promise((resolve, reject) => {
      const studentProfileModel = new StudentProfile();

      studentProfileModel.deleteStudentProfile(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}