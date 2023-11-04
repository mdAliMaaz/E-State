import asyncHandler from 'express-async-handler';
import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';

export const Protect = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401)
        throw new Error("You dont have Token , please login")
    }

    const { id } = JWT.verify(token, process.env.JWT_SECRECT);

    if (!id) {
        res.status(401)
        throw new Error("Invalid token, please login")
    }

    const user = await User.findById(id).select("_id name email avatar")

    req.user = user;

    next()

})