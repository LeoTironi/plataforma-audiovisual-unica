import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_USI || "", {
      dbName: "VillaRica",
    });

    isConnected = true;
    console.log("MongoDB is connected successfully");
  } catch (err) {
    console.error(err);
  }
};