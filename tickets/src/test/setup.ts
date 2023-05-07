import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "nklas;df";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((x) => x.deleteMany({})));
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return response.get("Set-Cookie");
};
