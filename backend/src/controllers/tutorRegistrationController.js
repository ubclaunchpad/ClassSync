import { tutorRegistration } from "../models/tutorRegistration.js";
import { hashPassword, comparePassword } from "../auth/authentication.js"
import { courses } from "../models/courses.js";
import jwt from "jsonwebtoken";
export default class tutorRegistrationController {

    constructor() {

        this.tutor = new tutorRegistration();
        this.course = new courses();
    }


    async getTutorOfferings(userID) {

        return new Promise((resolve, reject) => {
            return this.tutor.getTutorOfferings(userID).then((result) => {
                console.log("Result ", result);
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    async getProfile(userID) {

        return new Promise((resolve, reject) => {
            return this.tutor.getProfile(userID).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
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


    async signup(email, password, fname, lname) {
        const hashedPassword = await hashPassword(password);
        return new Promise((resolve, reject) => {
            return this.tutor.createAccount(email, hashedPassword, fname, lname).then((id) => {
                resolve(id);
            }).catch((err) => {
                reject(err);
            });
        });


    }
    async login(email, password) {
        return new Promise((resolve, reject) => {
            return this.tutor
                .getPassword(email)
                .then((res) => {
                    console.log("Res ", res)
                    const hashedPassword = res.hashedPassword;
                    const userId = res.user_id;
                    if (email) {
                        return comparePassword(password, hashedPassword).then((result) => {
                            if (result) {
                                const token = jwt.sign(
                                    {
                                        email: email,
                                        role: "tutor",
                                    },
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: "6h",
                                        algorithm: "HS256",
                                    }
                                );

                                console.log("Printing token: " + token)

                                resolve({
                                    email: email,
                                    role: "tutor",
                                    userId: userId,
                                    token: token,

                                });
                            } else {
                                reject("Incorrect password");
                            }
                        });
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

    updateBio(user_id, bio) {
        const tutor = new tutorRegistration();

        return tutor.updateBio(user_id, bio)
            .then(() => this.updateOfferings(user_id, bio.offerings))
            .catch((err) => Promise.reject(err));
    }

    updateOfferings(userID, offerings) {
        const tutor = new tutorRegistration();

        // Delete all offerings
        return tutor.deleteAllOfferings(userID)
            .then(() => tutor.addOfferings(userID, offerings))
            .catch((err) => Promise.reject(err));
    }


}


