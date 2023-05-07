import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { NotFoundError, errorHandler } from "@racheticketsorg/common";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true); //Trust and keep https when proxied from ngix
app.use(json());
app.use(
  cookieSession({
    signed: false, //no cookie encryption
    secure: process.env.NODE_ENV !== "test", //https
  })
);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
