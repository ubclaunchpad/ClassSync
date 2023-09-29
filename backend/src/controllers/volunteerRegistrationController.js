import { volunteerRegistration } from "../models/volunteerRegistration";
export default class volunteerRegistrationController {
    constructor() {
        volunteer = new volunteerRegistration();
    }
    activateAccount(userId) {

        // activate account for user
        return new Promise((resolve, reject) => {
            volunteer.activateAccount(userId, "Active").then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }
    setPassword(userID, password) {
        // set password for user
        return new Promise((resolve, reject) => {
            volunteer.setPassword(userId, password).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }

    updateBio(userID, bio) {
        // update bio for user
        // bio consists of first name, last name, date of birth, about me, profile picture
        return new Promise((resolve, reject) => {
            volunteer.updateBio(userId, bio).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }

    updateOfferings(userID, offerings) {
        return new Promise((resolve, reject) => {
            volunteer.updateOfferings(userId, offerings).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });

    }
}


