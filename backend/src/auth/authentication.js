import bcrypt from "bcrypt";

/**
 * Hashes a password to be saved in the database
 * @param {*} password
 */
const hashPassword = (password) => {
    const saltRounds = 14;
    bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
            // save in db with username
            // NO NEED TO SAVE SALT -- bcrypt figures it out along w the hash when comparing
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
const comparePassword = (givenPassword, hash) => {
    bcrypt
        .compare(givenPassword, hash)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};
