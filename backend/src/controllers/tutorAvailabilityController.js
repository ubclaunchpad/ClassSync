import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorAvailabilityController {

    constructor() {
        this.tutor = new tutorAvailability();
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


