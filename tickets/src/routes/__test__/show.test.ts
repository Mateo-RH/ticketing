import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get("/api/tickets/" + id)
    .send()
    .expect(404);
});

it("returns the ticket if it's found", async () => {
  const title = "title";
  const price = 10;

  const newTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const response = await request(app)
    .get(`/api/tickets/${newTicketResponse.body.id}`)
    .send();

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
