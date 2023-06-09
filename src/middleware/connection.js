import mongoose from "mongoose";
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        console.log('already connect')
        return handler(req, res)
    }
    try {
        console.log(process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL);
        console.log(' connect')
        return handler(req, res)
    } catch (error) {
        return
    }
}
export default connectDB