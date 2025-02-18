
import { admin } from "../models/admin.js";
import { tutor } from "../models/tutor.js";
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

    getClasses(enrollmentId) {
        const admin_ = new admin()

        return admin_.getClasses(enrollmentId).then((res) => res)
            .catch((err) => {
                throw err
            })


    }

    getTutorImages() {
        const admin_ = new admin()

        return admin_.getTutorImages().then((res) => {
            const hashMap = res.reduce((map, obj) => {
                map[obj.user_id] = obj.image;
                return map;
            }, {});
            return hashMap;
        }).catch((err) => {
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

    removeTutorsFromCourse(course_id) {
        const admin_ = new admin()
        return admin_.removeTutorsFromCourse(course_id).then((res) => res)
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

    getCheckedTutors(id) {
        const admin_ = new admin()
        return admin_.getCheckedTutors(id).then((res) => res)
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

    editCourse(body) {
        const admin_ = new admin()
        return admin_.editCourse(body).then((res) => res)
            .catch((err) => {
                throw err
            })
    }

    deleteCourse(id) {
        const admin_ = new admin()
        return admin_.deleteCourse(id).then((res) => res)
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
            .then((res) => {
                return res

            }).catch((err) => Promise.reject(err));
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

    async getTutorCourses() {
        const tutorsmodel = new tutor();
        return tutorsmodel.getTutorCourses()
            .then((tutors) => {
                return tutors;
            })
            .catch((err) => {
                console.log("Error getting tutors ", err);
                throw (err);
            });
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

    async getTutorReviews(id) {
        const admin_ = new admin();
        return admin_.getTutorReviews(id)
            .then((reviews) => {
                return reviews;
            })
            .catch((err) => {
                console.log("Error getting reviews ", err);
                throw (err);
            });
    }

    async addReview(body) {
        const admin_ = new admin();
        return admin_.addReview(body)
            .then((reviews) => {
                return reviews;
            })
            .catch((err) => {
                console.log("Error adding review ", err);
                throw (err);
            });
    }

    async getTutorAndCourse(id) {
        const admin_ = new admin();
        return admin_.getTutorandCourse(id)
            .then((tutor) => {
                return tutor;
            })
            .catch((err) => {
                console.log("Error getting tutor ", err);
                throw (err);
            });
    }
    async editOffering(tutor_id, course_id, action) {
        const admin_ = new admin();

        return admin_.editTutorOfferings(tutor_id, course_id, action)
            .then((res) => res)
            .catch((err) => Promise.reject(err));
    }

}


