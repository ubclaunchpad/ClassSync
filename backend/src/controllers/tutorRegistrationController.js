import { tutorRegistration } from "../models/tutorRegistration.js";
export default class tutorRegistrationController {

    createAccount(userId, password) {
        // create account for tutor
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.createAccount(userId, password).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }
    updatePassword(userID, newPassword) {
        // set password for user
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.setPassword(userId, newPassword).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }

    updateBio(userID, bio) {
        // update bio for user
        // bio consists of first name, last name, date of birth, about me, profile picture
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.updateBio(userId, bio).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }

    addOfferings(userID, offerings) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            Promise.all(offerings.map(offering => tutor.addOffering(userID, offering)))
                .then(results => {
                    resolve(results);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    deleteOfferings(userID, offerings) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            Promise.all(offerings.map(offering => tutor.deleteOffering(userID, offering)))
                .then(results => {
                    resolve(results);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


}


