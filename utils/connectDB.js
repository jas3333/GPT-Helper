import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/memories');
        console.log(`MongoDB connected ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
