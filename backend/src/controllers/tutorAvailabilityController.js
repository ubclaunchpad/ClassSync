import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorAvailabilityController {

    constructor() {
        this.tutor = new tutorAvailability();
    }

    setAvailability(userId, weeks, availability) {
        return this.tutor.createAvailabilityPattern(availability)
            .then((patternID) => {
                return tutor.setAvailabilityForWeeks(userId, weeks, patternID)

            });
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


