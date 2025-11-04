import mongoose from "mongoose";

const connectDB = async() => {
  await mongoose.connect(`${process.env.DATABASE_URL}`, { dbName: process.env.DATABASE_NAME })
  .then(() => { console.log(`Database connected ✅`) })
  .catch((e) => { console.log(`DATABASE CONNECTION ERROR - ${e}`) });
}

export default connectDB;