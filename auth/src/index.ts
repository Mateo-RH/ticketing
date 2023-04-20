import assert from "assert";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  assert(process.env.JWT_KEY, "JWT_KEY it's not defined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
