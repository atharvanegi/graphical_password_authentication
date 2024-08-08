import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true   
        })
        console.log(`MongoDB connected ${connection.connection.host}`.yellow);
    } catch (error) {
        console.log(`Error in connecting MongoDB ${error.message}`.red);
        process.exit(1);
    }
}

export default connectDB;