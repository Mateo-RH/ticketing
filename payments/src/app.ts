import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import {
  NotFoundError,
  currentUser,
  errorHandler,
} from "@racheticketsorg/common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true); //Trust and keep https when proxied from ngix
app.use(json());
app.use(
  cookieSession({
    signed: false, //no cookie encryption
    secure: process.env.NODE_ENV !== "test", //https
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
