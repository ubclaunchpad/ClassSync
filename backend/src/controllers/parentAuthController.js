import { hashPassword, comparePassword } from "../auth/authentication.js";
import parentAuth from "../models/parentAuth.js";

export default class parentAuthController {
  constructor() {
    this.parent = new parentAuth();
  }

  async signup(email, password) {
    const hashedPassword = await hashPassword(password);
    return new Promise((resolve, reject) => {
      return this.parent
        .createUser(email, hashedPassword)
        .then((id) => {
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      return this.parent
        .getPassword(email)
        .then((hashedPassword) => {
          if (email) {
            return comparePassword(password, hashedPassword).then((result) => {
              if (result) {
                resolve({ email: email, role: "guardian" });
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
}
