import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@racheticketsorg/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
