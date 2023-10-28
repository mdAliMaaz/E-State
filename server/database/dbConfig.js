import mongoose from "mongoose";
import colors from "colors";

const connectDb = async (url) => {
    try {
        await mongoose.connect(url)
        console.log(colors.bgGreen("Database Connected Successfully"))
    } catch (error) {
        console.log(colors.bgRed(`Database Connection Error: ${error.message}`))
    }
}

export default connectDb