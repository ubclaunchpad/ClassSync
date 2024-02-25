import { hashPassword, comparePassword } from "../auth/authentication.js";
import parentAuth from "../models/parentAuth.js";
import jwt from "jsonwebtoken";

export default class parentAuthController {
  constructor() {
    this.parent = new parentAuth();
  }

  async signup(email, password, fname, lname) {
    const hashedPassword = await hashPassword(password);
    return new Promise((resolve, reject) => {
      return this.parent
        .createUser(email, hashedPassword, fname, lname)
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
        .then((res) => {
          const hashedPassword = res.hashedPassword;
          const userId = res.user_id;
          const firstName = res.firstName;
          const lastName = res.lastName;
          if (email) {
            return comparePassword(password, hashedPassword).then((result) => {
              if (result) {
                const token = jwt.sign(
                  {
                    role: "guardian",
                    userId: userId,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "6h",
                    algorithm: "HS256",
                  }
                );

                resolve({
                  token: token,
                  firstName: firstName,
                  lastName: lastName,
                  userId: userId,
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
}
