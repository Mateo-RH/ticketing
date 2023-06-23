import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@racheticketsorg/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
