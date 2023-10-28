import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler';
import { comparePassword, hashPassword } from "../utils/hashingPassword.js";
import { generateToken } from "../utils/JWT.js";


export const signip = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("all fields are required")
    }

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
        res.status(400)
        throw new Error("Email already exists")
    }

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({ name, email, password: hashedPassword })

    if (!newUser) {
        res.status(500)
        throw new Error("Something went wrong , try again")
    }

    res.status(201).json({ success: true, message: "User signup successfull" })
})


export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("all fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        res.status(404)
        throw new Error("User not found")
    }

    const isPasswordCorrect = comparePassword(password, existingUser.password);

    if (!isPasswordCorrect) {
        res.status(400)
        throw new Error("Password is incorrect");

    }

    const token = generateToken({ id: existingUser._id });

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 5 });

    res.status(200).json({ success: true, message: "User login successfull" });

})