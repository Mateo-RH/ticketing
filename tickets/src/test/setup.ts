import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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
  var signin: () => string[];
}

global.signin = () => {
  const session = {
    jwt: jwt.sign(
      {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com",
      },
      process.env.JWT_KEY
    ),
  };
  const base64 = Buffer.from(JSON.stringify(session)).toString("base64");

  return [`session=${base64}`];
};
