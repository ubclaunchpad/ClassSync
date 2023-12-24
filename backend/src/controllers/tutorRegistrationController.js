import { tutorRegistration } from "../models/tutorRegistration.js";
import { hashPassword, comparePassword } from "../auth/authentication.js"
import { courses } from "../models/courses.js";
export default class tutorRegistrationController {

    constructor() {

        this.tutor = new tutorRegistration();
        this.course = new courses();
    }

    async getAllOfferings() {
        return new Promise((resolve, reject) => {
            return this.course.getAllOfferings().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }


    async signup(email, password) {
        const hashedPassword = await hashPassword(password);
        return new Promise((resolve, reject) => {
            return this.tutor.createAccount(email, hashedPassword).then((id) => {
                resolve(id);
            }).catch((err) => {
                reject(err);
            });
        });


    }
    login(email, password) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            return tutor.getPassword(email).then((hashedPassword) => {
                if (email) {


                    return comparePassword(password, hashedPassword).then((result) => {

                        if (result) {
                            resolve(email);
                        }
                        else {
                            reject("Incorrect password");
                        }

                    })
                }
            })
                .catch((err) => {
                    reject(err);
                });

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

    updateBio(email, bio) {
        // update bio for user
        // bio consists of first name, last name, max_hours, about me, profile picture
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.updateBio(email, bio).then((result) => {
                return this.updateOfferings(email, bio.offerings).then((result) => {
                    resolve(result);
                }).catch((err) => { reject(err); });
            }).catch((err) => { reject(err); });
        });
    }


    getBio(email) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.getBio(email).then((result1) => {
                return this.getOfferings(email).then((result2) => {
                    result1.offerings = result2;
                    resolve(result1);
                }).catch((err) => { reject(err); });
            });
        }).catch((err) => { reject(err); });
    }

    getOfferings(userID) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            tutor.getOfferings(userID).then((result) => {
                resolve(result);
            }).catch((err) => { reject(err); });
        });
    }

    updateOfferings(userID, offerings) {
        return new Promise((resolve, reject) => {
            const tutor = new tutorRegistration();
            // delete all offerings
            return new Promise((resolve, reject) => {
                tutor.deleteAllOfferings(userID).then((result) => {
                    return new Promise((resolve, reject) => {
                        // add all offerings
                        tutor.addOfferings(userID, offerings).then((result) => {
                            resolve(result);
                        }).catch((err) => { reject(err); });

                    }).catch((err) => { reject(err); });
                }).catch((err) => { reject(err); });
            });
        })
    }




}


