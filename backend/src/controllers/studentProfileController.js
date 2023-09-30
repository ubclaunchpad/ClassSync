// Methods called from the route are here, any db calls are made from here to the queries in models
import { StudentProfile } from "../models/studentProfile.js";

export default class studentProfileController {

    getStudentProfile() {
        return new Promise((resolve, reject) => {
          const studentProfileModel = new StudentProfile();
    
          studentProfileModel.getStudentProfile((err, result) => {
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
                student_id: req.body.student_id,
                first_name: req.body.f_name,
                last_name: req.body.l_name,
                birthday: req.body.dob,
                accomodations: req.body.accomodations,
                neurodivergent: req.body.neurodivergent,
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