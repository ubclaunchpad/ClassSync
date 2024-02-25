
import { admin } from "../models/admin.js";
import { tutor } from "../models/tutor.js";
export default class adminController {

    getCourses() {
        const admin_ = new admin();

        return admin_.getCourses()
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    getTutorOfferings() {
        const tutors = new tutor();

        return tutors.getAllTutorOfferings()
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    async getUsers() {
        const admin_ = new admin();

        return admin_.getAllUsers()
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    getAvailability(userID) {
        return new Promise((resolve, reject) => {
            const admin_ = new admin()
            return admin_.getAvailabilityById(userID).then((res) =>
                resolve(res))
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getRegistrations() {
        const admin_ = new admin();

        return admin_.getRegistrations()
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    updatePaymentStatus(id, status) {
        const admin_ = new admin();

        return admin_.updatePaymentStatus(id, status)
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    async getAllTutors() {
        const tutorsmodel = new tutor();
        return tutorsmodel.getAllTutors()
            .then((tutors) => {
                return tutors;
            })
            .catch((err) => {
                console.log("Error getting tutors ", err);
                throw (err);
            });
    }

}


