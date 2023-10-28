import JWT from 'jsonwebtoken';

export const generateToken = (options) => {
    return JWT.sign(options, process.env.JWT_SECRECT, { expiresIn: "15d" })
}