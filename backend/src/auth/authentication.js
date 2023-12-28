import bcrypt from "bcrypt";
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
 * @param {*} role
 * @returns
 */
function authorize(role) {
  return [
    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (err, req, res, next) => {
      if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Unauthorized Error" });
      }
      if (
        req.auth.role !== "Parent" &&
        req.auth.role !== "Tutor" &&
        req.auth.role !== "Admin"
      ) {
        return res.status(401).json({ message: "Unauthorized User" });
      }
      if (role === "Admin" && req.auth.role !== "Admin") {
        return res.status(401).json({ message: "Unauthorized Admin" });
      }
      if (role === "Parent" && req.auth.role !== "Parent") {
        return res.status(401).json({ message: "Unauthorized Parent" });
      }
      if (role === "Tutor" && req.auth.role !== "Tutor") {
        return res.status(401).json({ message: "Unauthorized Tutor" });
      }
      next();
    },
  ];
}

export default authorize;
