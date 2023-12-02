import { comparePassword, hashPassword } from "../auth/authentication";

export default class loginController {
  authenticate = (req, res) => {
    return new Promise((resolve, reject) => {
      // const username = req.body.username;
      const password = req.body.password;

      // TODO: Retrieve user from database based on username
      retrieveUser(req)
        .then((user) => {
          if (comparePassword(password, user.password)) {
            resolve(user);
          } else {
            reject({ error: "Invalid password" });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  login = (req, res) => {
    return new Promise((resolve, reject) => {
      authenticate(req)
        .then((response) => {
          const token = jwt.sign(
            {
              email: response.email,
              role: response.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "12h",
              algorithm: "HS256",
            }
          );

          // ! Return token for now -> How should we store?
          // ! What would we need to return?
          resolve({
            token: token,
            email: response.email,
            role: response.role,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
