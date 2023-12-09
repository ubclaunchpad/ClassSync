import { hashPassword, comparePassword } from "../auth/authentication.js"
import adminAuth from "../models/adminAuth.js";

export default class adminAuthController {

    constructor() {
        this.admin = new adminAuth();

    }

    async signup(email, password) {
        const hashedPassword = await hashPassword(password);
        return new Promise((resolve, reject) => {
            return this.admin.createUser(email, hashedPassword).then((id) => {
                resolve(id);
            }).catch((err) => {
                reject(err);
            });
        });


    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            return this.admin.getPassword(email).then((hashedPassword) => {
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
}



