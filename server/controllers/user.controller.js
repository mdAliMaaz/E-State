import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler';
import { comparePassword, hashPassword } from "../utils/hashingPassword.js";
import { generateToken } from "../utils/JWT.js";
import { v2 as cloudinary } from 'cloudinary';

// Signin
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

// Login
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

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });

    res.status(200).json({ success: true, message: "User login successfull", "User": existingUser._id });

})

// Logout
export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "")
    res.status(200).json({ success: true, message: "User logged out" })
})


// My profile
export const getMyProfile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

// My profile
export const updateProfile = asyncHandler(async (req, res) => {
    let images = req.files;

    if (req.files) {

        const { public_id, secure_url } = await cloudinary.uploader.upload(images[0].path, { folder: "ESTATE/avatar" });
        req.body.avatar = {
            public_Id: public_id,
            url: secure_url
        }

        await cloudinary.uploader.destroy(req.user.avatar.public_Id)
    }

    await User.findByIdAndUpdate(req.user._id, req.body);

    res.status(200).json({ success: true, message: "Profile update successfull" });
})