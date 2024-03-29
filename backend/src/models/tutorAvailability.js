import con from "../../index.js";

export class tutorAvailability {
  async deleteBooking(booking_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL public.delete_booking($1)",
          [booking_id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getBookings(enrollment_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT public.get_enrollment_bookings($1)",
          [enrollment_id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows[0].get_enrollment_bookings);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async insertBooking(booking) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT public.insert_booking($1, $2, $3, $4)",
          [
            booking.enrollment_id,
            booking.session_duration,
            booking.tutor_id,
            booking.start_time,
          ],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows[0].insert_booking);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getTutorByCourse(course_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_tutors_for_course($1)",
          [course_id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getSelectedTutorsAvailability(start_date, tutorIds) {
    const client = await con.connect();
    console.log("Getting availability");
    // console.log(start_date, tutorIds);

    let date = "12-31-2023";
    let tutor_array = [1, 2, 3];
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_tutors_availability($1, $2)",
          [start_date, tutorIds],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log("Got availability ", results);
              resolve(results.rows);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async getAvailableTutors(startDate, course_id) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_available_tutors($1, $2)",
          [startDate, course_id],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results.rows);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async getSchedule(userID, startDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_tutor_availability($1, $2)",
          [userID, startDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log("Got schedule ", results);
              resolve(results.rows[0].get_tutor_availability);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getRecurringAvailability(userID) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_recurring_availability($1)",
          [userID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log("Results ", results);
              resolve(results.rows[0].get_recurring_availability);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async setRecurringAvailability(userID, patternID) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL insert_recurring_availability($1, $2)",
          [userID, patternID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              console.log("Inserted recurring availability");
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getDates(userID) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_tutor_dates($1);",
          [userID],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log("Results ", results);
              resolve(results.rows[0]);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async createAvailabilityPattern(availability) {
    const client = await con.connect();
    console.log("Creating availability pattern");
    // const avail = "ARRAY[ROW(ARRAY['8:00', '8:30']::character varying[])::public.\"TimesArr\", ROW(ARRAY['9:00', '9:30']::character varying[])::public.\"TimesArr\"]";
    // const avail = { 0: ["8:00", "8:30"], 1: ["9:00", "9:30"], 2: [], 3: [], 4: [], 5: [], 6: [] };
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL insert_availability_pattern($1, $2)",
          [availability, null],
          (error, results) => {
            // console.log("Results ", results);
            console.log("Error ", error);
            if (error) {
              console.error("throwing error:", error);
              reject(error);
              // Handle the error
            } else {
              // Access the pattern_id from the results
              console.log("Inside results");
              const patternId = results.rows[0].id;
              // console.log("Pattern ID:", patternId);
              resolve(patternId);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getAppointmentsByTutor(tutorId, startDate, endDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM get_appointments_by_tutor($1, $2, $3)",
          [tutorId, startDate, endDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              // console.log("Got appointments ", results);
              resolve(results.rows);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async clearAvailability(userID, startDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL clear_availability($1, $2)",
          [userID, startDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async resetAvailability(userID, startDate, endDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL set_tutor_availability($1, $2, $3)",
          [userID, startDate, endDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
  async addSlots(tutorId, startDate, endDate, day, times) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL add_slots($1, $2, $3, $4, $5)",
          [tutorId, startDate, endDate, day, times],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async removeAvailability(tutorId, startDate, endDate, day, times) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL remove_slots($1, $2, $3, $4, $5)",
          [tutorId, startDate, endDate, day, times],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async setAvailabilityForWeeks(userID, weeks, patternID) {
    const client = await con.connect();
    // const weeksParsed = JSON.parse(weeks);

    try {
      const promises = weeks.map((week) => {
        return new Promise((resolve, reject) => {
          console.log(week.start_date, week.end_date);
          con.query(
            "CALL insert_tutor_availability($1, $2, $3, $4, $5)",
            [userID, week.start_date, week.end_date, patternID, true],
            (error, results) => {
              if (error) {
                console.error("Error:", error);
                reject(error);
              } else {
                resolve();
              }
            }
          );
        });
      });

      // Use Promise.all to wait for all setAvailability calls to complete
      await Promise.all(promises);
    } finally {
      client.release();
    }
  }

  async updateAvailability(userID, start_date, pattern_id, at_capacity) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL update_tutor_availability(?, ?, ?, ?)",
          [userID, start_date, pattern_id, at_capacity],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async getTutorAvailability(tutorId, startDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL getAvailabilitiesByTutor(?, ?)",
          [tutorId, startDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }

  async deleteAvailability(tutorId, startDate, endDate) {
    const client = await con.connect();
    try {
      return new Promise((resolve, reject) => {
        con.query(
          "CALL deleteTutorAvailabilityByWeek(?, ?, ?)",
          [tutorId, startDate, endDate],
          (error, results) => {
            if (error) {
              console.error("Error:", error);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } finally {
      client.release();
    }
  }
}
