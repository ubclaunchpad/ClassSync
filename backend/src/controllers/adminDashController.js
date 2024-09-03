import { adminDash } from "../models/adminDash.js";

export default class AdminDashController {
    getClassHistory() {
        const admin_ = new adminDash()

        return admin_.getClassHistory().then((res) => res)
            .catch((err) => {
                throw err
            })


    }

}