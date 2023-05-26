import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@racheticketsorg/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
