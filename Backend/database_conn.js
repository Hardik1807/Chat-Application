import mongoose from "mongoose";

const connectdb = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/")
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
            // throw err; // Rethrow the error to be caught in the calling function
        });
};

export default connectdb;
