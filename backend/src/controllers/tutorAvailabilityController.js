import { tutorAvailability } from "../models/tutorAvailability.js";
export default class tutorAvailabilityController {

    constructor() {
        this.tutor = new tutorAvailability();
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
    setAvailability(userID, weeks, availability) {
        console.log("Setting availability")

        return this.tutor.createAvailabilityPattern(availability)
            .then((patternID) => {
                console.log("Setting availability")
                console.log("Pattern ID: ", patternID);
                console.log("Weeks: ", weeks)
                console.log(JSON.parse(weeks).length)

                return new Promise((resolve, reject) => {
                    this.tutor.setAvailabilityForWeeks(userID, weeks, patternID).then(() => {
                        resolve();
                    }
                    ).catch((err) => {
                        console.log("Error setting availability ", err)
                        reject(err);
                    });


                }).catch((err) => {
                    console.log("Error setting availability ", err)
                });
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


