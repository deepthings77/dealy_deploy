import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGO_DB_URI);
        console.log('mongodb connected successfully.');
        
    } catch (error) {

        console.log('Error while connecting to mongodb');
        console.log(error.message);
    }
}
export default connectDB;