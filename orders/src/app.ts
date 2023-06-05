import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import {
  NotFoundError,
  currentUser,
  errorHandler,
} from "@racheticketsorg/common";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";

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

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
