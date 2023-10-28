import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorAvailabilityController {

    setAvailability(userId, weeks, availability) {
        const tutor = new tutorAvailability();

        return tutor.createAvailabilityPattern(availability)
            .then((patternID) => {
                return tutor.setAvailability(userId, weeks, patternID)

            });
    }




}


