import mongoose from "mongoose";

export default async function connectDB() {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
