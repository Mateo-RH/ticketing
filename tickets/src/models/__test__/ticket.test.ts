import { Ticket } from "../ticket";

it("Implements occ", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  const [firstInstance, secondInstance] = await Promise.all([
    Ticket.findById(ticket.id),
    Ticket.findById(ticket.id),
  ]);

  firstInstance.set({ price: 10 });
  secondInstance.set({ price: 15 });

  await firstInstance.save();

  try {
    await secondInstance.save();
  } catch (err) {
    return;
  }

  throw new Error("Shouldn't reach this point");
});

it("Increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
