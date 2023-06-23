import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from "@racheticketsorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(
    { id, title, price }: TicketCreatedEvent["data"],
    msg: Message
  ) {
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
