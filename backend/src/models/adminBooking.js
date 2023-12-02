import { pgPool } from "../../index.js";

export class adminBooking {
  async bookAppointment(tutorId, studentId, courseId, date, duration) {
    const client = await pgPool.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL add_appointment($1, $2, $3, $4, $5)",
          [studentId, tutorId, courseId, date, duration],
          (error, res) => {
            if (error) {
              console.log("Error: ", error);
              reject(error);
            } else {
              resolve(res);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async changeAppointment(appointmentId, newTutorId, courseId, date, duration) {
    const client = await pgPool.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL update_appointment($1, $2, $3, $4, $5)",
          [studentId, newTutorId, courseId, date, duration],
          (error, res) => {
            if (error) {
              console.log("Error: ", error);
              reject(error);
            } else {
              resolve(res);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async deleteAppointment(appointmentId) {
    const client = await pgPool.connect();
    try {
      return new Promise((resolve, reject) => {
        client.query(
          "CALL delete_appointment($1)",
          [appointmentId],
          (error, res) => {
            if (error) {
              console.log("Error: ", error);
              reject(error);
            } else {
              resolve(res);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
}
