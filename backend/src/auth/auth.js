import { expressjwt } from 'express-jwt';

function authorize(role) {

    return [
        expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
        (err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(401).json({ message: 'Unauthorized Error' });
            }
            if (req.auth.role !== 'Parent' && req.auth.role !== 'Tutor' && req.auth.role !== 'Admin') {
                return res.status(401).json({ message: 'Unauthorized User' });
            }
            if (role === "Admin" && req.auth.role !== 'Admin') {
                return res.status(401).json({ message: 'Unauthorized Admin' });
            }
            if (role === "Parent" && req.auth.role !== 'Parent') {
                return res.status(401).json({ message: 'Unauthorized Parent' });
            }
            if (role === "Tutor" && req.auth.role !== 'Tutor') {
                return res.status(401).json({ message: 'Unauthorized Tutor' });
            }
            next();
        }
    ]
}

export default authorize;