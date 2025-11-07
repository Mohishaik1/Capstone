import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://alhateem:alhateem@forms.gpefor1.mongodb.net/alhateem`);
        console.log("Connected to DB 🌏")
    } catch (error) {
        console.log(error)
    }

}

connectDB();

export default connectDB;