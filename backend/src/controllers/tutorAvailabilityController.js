import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorRegistrationController {

    setAvailability(userId, weeks, availability) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorAvailability();
            tutor.createAvailabilityPattern(availability).then((patternID) => {
                for (let week of weeks) {
                    tutor.setAvailability(userId, week, patternID).then((result) => {
                        resolve(result);
                    }).catch((err) => { reject(err); });
                }

            })

        });
    }



}


