import { hashPassword, comparePassword } from "../auth/authentication.js";
import adminAuth from "../models/adminAuth.js";
import jwt from "jsonwebtoken";
import sendEmail from "./volunteerEmailController.js";

export default class adminAuthController {
  constructor() {
    this.admin = new adminAuth();
  }

  async signup(email, password, fname, lname) {
    const hashedPassword = await hashPassword(password);
    return new Promise((resolve, reject) => {
      return this.admin
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
      return this.admin
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
                    role: "admin",
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
                  user: {
                    name: firstName + " " + lastName,
                    role: 'admin',
                    picture: res.picture
                  }
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
