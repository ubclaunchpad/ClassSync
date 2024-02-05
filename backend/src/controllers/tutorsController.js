import { tutor } from "../models/tutor.js";

export default class tutorsController {
    
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