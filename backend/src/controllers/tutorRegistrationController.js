import { tutorRegistration } from "../models/tutorRegistration.js";
import { hashPassword, comparePassword } from "../auth/authentication.js";
import { courses } from "../models/courses.js";
import jwt from "jsonwebtoken";
export default class tutorRegistrationController {
  constructor() {
    this.tutor = new tutorRegistration();
    this.course = new courses();
  }

  async renewtutors(tutors, enddate) {
    return new Promise((resolve, reject) => {
      return this.tutor
        .renewTutors(tutors, enddate)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async updateNotes(booking_id, notes) {
    return new Promise((resolve, reject) => {
      return this.course
        .updateNotes(booking_id, notes)
       .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getBookingInfo(booking_id) {
    return new Promise((resolve, reject) => {
      return this.course
        .getBookingInfo(booking_id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getClassInfo(booking_id) {
    return new Promise((resolve, reject) => {
      return this.course
        .getClassInfo(booking_id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getNotesForBooking(booking_id) {
    return new Promise((resolve, reject) => {
      return this.course
        .getNotesForBooking(booking_id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });

      
    });
  }

  async shareFiles(booking_id, files) {
    return new Promise((resolve, reject) => {
      return this.course
        .shareFiles(booking_id, files)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getCourseFiles(enrollment_id)
 {
    return new Promise((resolve, reject) => {
      return this.course
        .getCourseFiles(enrollment_id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getSharedFiles(booking_id)
  {
     return new Promise((resolve, reject) => {
       return this.course
         .getSharedFiles(booking_id)
         .then((result) => {
           resolve(result);
         })
         .catch((err) => {
           reject(err);
         });
     });
   }
  async addLearningGoalProgress(enrollmentId, completed) {
    return new Promise((resolve, reject) => {
      return this.course
        .addLearningGoalProgress(enrollmentId, completed)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getLearningGoalsProgress(enrollmentId) {
    return new Promise((resolve, reject) => {
      return this.course
        .getLearningGoalProgress(enrollmentId)
        .then((result) => {
          // console.log(result)

          const { learning_goals, completed } = result;

          result = learning_goals[0].map((goal, index) => {
              const isCompleted = completed[0].includes(index);
              return { goal, completed: isCompleted };
          });
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }


  async getTutorOfferings(userID) {
    return new Promise((resolve, reject) => {
      return this.tutor
        .getTutorOfferings(userID)
        .then((result) => {
          // console.log("Result ", result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getProfile(userID) {
    return new Promise((resolve, reject) => {
      return this.tutor
        .getProfile(userID)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getAllTutors() {
    return new Promise((resolve, reject) => {
      return this.tutor
        .getAllTutors()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getAllOfferings() {
    return new Promise((resolve, reject) => {
      return this.course
        .getAllOfferings()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async signup(email, password, fname, lname, image, role) {
    const hashedPassword = await hashPassword(password);
    return new Promise((resolve, reject) => {
      return this.tutor
        .createAccount(email, hashedPassword, fname, lname, image, role)
        .then((id) => {
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async login(email, password) {
    return new Promise((resolve, reject) => {
      return this.tutor
        .getPassword(email)
        .then((res) => {
          // console.log("Res ", res);
          const hashedPassword = res.hashedPassword;
          const userId = res.user_id;
          const firstName = res.firstName;
          const lastName = res.lastName;
          if (email) {
            return comparePassword(password, hashedPassword).then((result) => {
              if (result) {
                const token = jwt.sign(
                  {
                    email: email,
                    role: "tutor",
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "6h",
                    algorithm: "HS256",
                  }
                );

                // console.log("Printing token: " + token);

                resolve({
                  email: email,
                  role: "tutor",
                  userId: userId,
                  token: token,
                  firstName: firstName,
                  lastName: lastName,
                });
              } else {
                reject("Incorrect password");
              }
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updatePassword(userID, newPassword) {
    // set password for user
    return new Promise((resolve, reject) => {
      const tutor = new tutorRegistration();
      tutor
        .setPassword(userId, newPassword)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getBio(email) {
    return new Promise((resolve, reject) => {
      const tutor = new tutorRegistration();
      tutor.getBio(email).then((result1) => {
        return this.getOfferings(email)
          .then((result2) => {
            result1.offerings = result2;
            resolve(result1);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }).catch((err) => {
      reject(err);
    });
  }

  getOfferings(userID) {
    return new Promise((resolve, reject) => {
      const tutor = new tutorRegistration();
      tutor
        .getOfferings(userID)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateBio(user_id, bio) {
    const tutor = new tutorRegistration();

    return tutor
      .updateBio(user_id, bio)
      .then(() => this.updateOfferings(user_id, bio.offerings))
      .catch((err) => Promise.reject(err));
  }

  addLog(data) {
    const tutor = new tutorRegistration();

    return tutor
      .addLog(data)
      .then(() => Promise.resolve())
      .catch((err) => Promise.reject(err));
  }

  getLogs() {
    const tutor = new tutorRegistration()
      return tutor
      .getLogs()
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
  updateOfferings(userID, offerings) {
    const tutor = new tutorRegistration();

    // Delete all offerings
    return tutor
      .deleteAllOfferings(userID)
      .then(() => tutor.addOfferings(userID, offerings))
      .catch((err) => Promise.reject(err));
  }
}
