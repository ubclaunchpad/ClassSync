
import { admin } from "../models/admin.js";
import { v4 as uuidv4 } from 'uuid';


export default class adminController {
    
    getToken() {
        const admin_ = new admin()
        const token = uuidv4(); // Generate a new token
        
        return admin_.saveToken(token).then((res) => res)
        .catch((err) => {
           throw err
        })


    }

    validateToken(token) {
        const admin_ = new admin()

        return admin_.validateToken(token).then((res) => res)
        .catch((err) => {
           throw err
        })
    }

    deleteToken(token) {

        const admin_ = new admin()

        return admin_.deleteToken(token).then((res) => res)
        .catch((err) => {
           throw err
        })
    }

    addTutorsToCourse(course_id, tutor_ids) {
        const admin_ = new admin()
        return admin_.addTutorsToCourse(course_id, tutor_ids).then((res) => res)
        .catch((err) => {
           throw err
        })
    }

    addCourse(body) {
         const admin_ = new admin()
         return admin_.addCourse(body).then((res) => res)
         .catch((err) => {
            throw err
         })
    }

    viewCourse(id) {
        const admin_ = new admin()
        return admin_.viewCourse(id).then((res) => res)
        .catch((err) => {
           throw err
        })
    }

    getCourseTutorMap() {
        const admin_ = new admin()
        return admin_.getCourseTutorMap().then((res) => res)
        .catch((err) => {
           throw err
        })
    }

    getTutors() {
        const admin_ = new admin()
        return admin_.getTutors().then((res) => res)
        .catch((err) => {
           throw err
        })

    }
    getCourses() {
        const admin_ = new admin();

        return admin_.getCourses()
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

    getCourses() {
        const admin_ = new admin();

        return admin_.getCourses()
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

}


