import bcrypt from "bcryptjs";
import { expressjwt } from "express-jwt";

/**
 * Hashes a password to be saved in the database
 * @param {*} password
 */
export const hashPassword = (password) => {
  const saltRounds = 14;
  return bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      // save in db with username
      // NO NEED TO SAVE SALT -- bcrypt figures it out along w the hash when comparing
      return hash;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Compares the given password with the stored hash to see if they match
 * @param {*} givenPassword - Password given by user attempting to sign in
 * @param {*} hash - Hashed password stored in DB
 * @returns {boolean} - Indicates if given password matches stored password
 */
export const comparePassword = (givenPassword, hash) => {
  return bcrypt
    .compare(givenPassword, hash)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Authorization middleware
 * @param {*} role - Either 'Admin', 'Guardian', or 'Tutor'
 * @returns {function} - Express middleware functions
 */
function authorize(role) {
  return [
    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    // Role authorization middleware
    (req, res, next) => {
      if (
        req.auth.role !== "admin" &&
        req.auth.role !== "guardian" &&
        req.auth.role !== "tutor"
      ) {
        return res.status(401).json({ message: "Unauthorized User" });
      }
      if (role === "Admin" && req.auth.role !== "admin") {
        return res.status(401).json({ message: "Unauthorized Admin" });
      }
      if (role === "Guardian" && req.auth.role !== "guardian") {
        return res.status(401).json({ message: "Unauthorized Guardian" });
      }
      if (role === "Tutor" && req.auth.role !== "tutor") {
        return res.status(401).json({ message: "Unauthorized Tutor" });
      }
      next();
    },
    // Error middleware -- Called when expressjwt() throws an error
    (err, req, res, next) => {
      if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Unauthorized Error" });
      }
      next();
    },
  ];
}

export default authorize;
