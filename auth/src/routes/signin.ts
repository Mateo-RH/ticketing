import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@racheticketsorg/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [body("email").isEmail(), body("password").trim().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError("Invalid Credentials");

    const passwordMatch = await Password.compare(user.password, password);
    if (!passwordMatch) throw new BadRequestError("Invalid Credentials");

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY
    );
    req.session.jwt = userJwt;

    res.status(200).send(user);
  }
);

export { router as signinRouter };
