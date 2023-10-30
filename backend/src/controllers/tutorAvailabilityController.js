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
        const currentDayOfWeek = today.getDay();
        const daysToSubtract = (currentDayOfWeek - dayOfWeek + 7) % 7;

        const pastMonday = new Date(today);
        pastMonday.setDate(today.getDate() - daysToSubtract);
        return this.tutor.getTutorAvailability(userID, pastMonday).then((availability) => {
            resolve(availability);
        }
        ).catch((err) => {
            reject(err);
        });
    }




}


