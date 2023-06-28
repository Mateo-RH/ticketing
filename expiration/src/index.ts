import assert from "assert";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  assert(process.env.NATS_CLIENT_ID, "NATS_CLIENT_ID it's not defined");
  assert(process.env.NATS_URL, "NATS_URL it's not defined");
  assert(process.env.NATS_CLUSTER_ID, "NATS_CLUSTER_ID it's not defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (e) {
    console.error(e);
  }
};

start();
