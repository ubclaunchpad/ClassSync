import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorAvailabilityController {

    constructor() {
        this.tutor = new tutorAvailability();
    }

    async deleteBooking(booking_id) {
        return this.tutor.deleteBooking(booking_id).then((result) => {
            return result;
        }
        ).catch((err) => {
            console.log("Error getting schedule ", err)
        });
    }

    async getBookings(enrollment_id) {
        return this.tutor.getBookings(enrollment_id).then((bookings) => {

            return bookings;
        }
        ).catch((err) => {
            console.log("Error getting schedule ", err)
        });
    }

    async insertBooking(booking) {
        return this.tutor.insertBooking(booking).then((result) => {
            return result;
        }).catch((err) => {
            throw (err);
        });
    }
    async getAvailableTutors(startDate) {
        return this.tutor.getAvailableTutors(startDate).then((availabilityData) => {

            let availabilityHashmap = {};
            let tutorIdNameMap = {}

            // Loop through each tutor's availability
            availabilityData.forEach(tutorData => {
                Object.entries(tutorData.availability_times).forEach(([day, timeSlots]) => {
                    day = parseInt(day); // Convert day to integer
                    if (!(day in availabilityHashmap)) {
                        availabilityHashmap[day] = {};
                    }
                    tutorIdNameMap[tutorData.tutor_id] = tutorData.tutor_name;


                    for (let i = 0; i < timeSlots.length - 1; i++) {
                        // Check if the current time slot and the next one are consecutive
                        let currentSlot = timeSlots[i];
                        let nextSlot = timeSlots[i + 1];
                        let currentSlotDate = new Date(`1970-01-01T${currentSlot}:00`);
                        let nextSlotDate = new Date(`1970-01-01T${nextSlot}:00`);
                        let diffMinutes = (nextSlotDate - currentSlotDate) / 1000 / 60;

                        if (diffMinutes === 30) {
                            if (!(currentSlot in availabilityHashmap[day])) {
                                availabilityHashmap[day][currentSlot] = new Set();
                            }

                            // Add tutor_id to the set for the given time slot
                            availabilityHashmap[day][currentSlot].add(tutorData.tutor_id);
                        }
                    }
                });
            });

            // Convert each Set to an Array for JSON serialization
            Object.values(availabilityHashmap).forEach(timeSlots => {
                Object.keys(timeSlots).forEach(timeSlot => {
                    timeSlots[timeSlot] = Array.from(timeSlots[timeSlot]);
                });
            });

            // Filter out days with no available time slots
            availabilityHashmap = Object.fromEntries(
                Object.entries(availabilityHashmap).filter(([day, timeSlots]) => Object.keys(timeSlots).length > 0)
            );

            return { availabilityHashmap, tutorIdNameMap };
        });
    }
    async getSchedule(userID, startDate) {
        return this.tutor.getSchedule(userID, startDate).then((availability) => {

            return availability;
        }
        ).catch((err) => {
            console.log("Error getting schedule ", err)
            // reject(err);
        });
    }

    async getRecurringAvailability(userID) {
        return this.tutor.getRecurringAvailability(userID).then((availability) => {
            return availability;
        }).catch((err) => {
            console.log("Error getting recurring availability ", err)
            reject(err);
        });
    }


    getDates(userID) {
        return this.tutor.getDates(userID).then((dates) => {
            console.log("Dates ", dates);
            return dates;
        }).catch((err) => {
            console.log("Error getting dates ", err)
            // reject(err);
        });
    }
    async setAvailability(userID, weeks, availability, isRecurring) {
        try {
            console.log("Setting availability");

            const patternID = await this.tutor.createAvailabilityPattern(availability);

            console.log("Pattern ID: ", patternID);
            console.log("Weeks: ", weeks);
            console.log(JSON.parse(weeks).length);

            await this.tutor.setAvailabilityForWeeks(userID, weeks, patternID);

            if (isRecurring) {
                await this.tutor.setRecurringAvailability(userID, patternID);
            }
        } catch (err) {
            console.log("Error setting availability ", err);
            throw err;
        }
    }

    getAvailability(userID) {
        const today = new Date();
        return this.tutor.getTutorAvailability(userID, today).then((availability) => {
            resolve(availability);
        }
        ).catch((err) => {
            reject(err);
        });
    }

    deleteAvailability(userID, startDate, endDate) {
        return tutor.deleteAvailability(userID, startDate, endDate).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }


}


