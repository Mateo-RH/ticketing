import assert from "assert";
import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  assert(process.env.JWT_KEY, "JWT_KEY it's not defined");
  assert(process.env.MONGO_URI, "MONGO_URI it's not defined");
  assert(process.env.NATS_CLIENT_ID, "NATS_CLIENT_ID it's not defined");
  assert(process.env.NATS_URL, "NATS_URL it's not defined");
  assert(process.env.NATS_CLUSTER_ID, "NATS_CLUSTER_ID it's not defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
