import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import assert from "assert";

const app = express();

app.set("trust proxy", true); //Trust and keep https when proxied from ngix
app.use(json());
app.use(
  cookieSession({
    signed: false, //no cookie encryption
    secure: true, //https
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
