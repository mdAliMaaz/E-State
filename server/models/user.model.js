import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required field"],
        minLenght: [3, "name must be atleast 3 charaters"]
    },
    email: {
        type: String,
        require: [true, "email is required field"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is required field"],
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;