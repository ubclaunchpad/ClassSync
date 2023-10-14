
import { admin } from "../models/admin.js";
export default class adminController {
    getAvailability(userID) {
        return new Promise((res, rej) => {
            const adm = new admin()
            adm.getAvailabilitiesByTutor(userID).then(r => resolve(r)).catch(e => reject(e))
        })
    }
}
