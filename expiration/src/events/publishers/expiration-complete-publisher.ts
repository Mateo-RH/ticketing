import { Publisher, ExpirationCompleteEvent, Subjects } from "@racheticketsorg/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
