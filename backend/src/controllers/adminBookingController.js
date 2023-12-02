import { adminBooking } from "../models/adminBooking.js";

export default class adminBookingController {
  constructor() {
    this.admin = new adminBooking();
  }

  setAppointment(tutorId, studentId, courseId, date, duration) {
    return new Promise((resolve, reject) => {
      this.admin
        .bookAppointment(tutorId, studentId, courseId, date, duration)
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateAppointment(appointmentId, newTutorId, courseId, date, duration) {
    return new Promise((resolve, reject) => {
      this.admin
        .changeAppointment(appointmentId, newTutorId, courseId, date, duration)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(error);
        });
    });
  }

  deleteAppointment(appointmentId) {
    return new Promise((resolve, reject) => {
      this.admin
        .deleteAppointment(appointmentId)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  }
}
