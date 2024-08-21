import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("DB is already connected");
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.log(error.message);
        isConnected = false;
    }    
}