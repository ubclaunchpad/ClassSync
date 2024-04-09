// Methods called from the route are here, any db calls are made from here to the queries in models
import { StudentProfile } from "../models/studentProfile.js";

export default class studentProfileController {


  getStudentEnrollment(id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getStudentEnrollment(id).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      // return err;
    });
  }
  getStudentsByGuardian(id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getStudentsByGuardian(id).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      // return err;
    });
  }

  addEnrollment(student_id, course_id, registration_date) {

    const studentProfileModel = new StudentProfile();
    return studentProfileModel.addEnrollment(student_id, course_id, registration_date).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log("Error is -", err);
      throw err;
      // return err;
    });
  }
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

  getBookingsByStudentId(student_id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getBookingsByStudentId(student_id).then((response) => {
      return response;
    }
    ).catch((err) => {
      console.log(err);
      throw err;
      // return err;
    });
  }

  getBookingsByGuardianId(guardian_id) {
    const studentProfileModel = new StudentProfile();
    return studentProfileModel.getBookingsByGuardianId(guardian_id).then((response) => {
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
        grade: req.body.grade,
        city: req.body.city,
        province: req.body.province,
        pronouns: req.body.pronouns,
        accommodations: req.body.accommodations,
        color: req.body.color,
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