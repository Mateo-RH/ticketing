import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from "@racheticketsorg/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
