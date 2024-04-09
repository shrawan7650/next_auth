import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection.on("connected", () =>
      console.log("MongoDB connected successfully")
    );
    connection.on("error", (error) => {
      console.log("Error" + error);
      process.exit();
    });
  } catch (err) {
    console.log("something went wromg in connecting to BD");
    console.log(err);
  }
}
