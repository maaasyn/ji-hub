import { createConnection, getRepository } from "typeorm";
import { name, internet } from "faker";
import { Event } from "../entity/Event";

const Seed = async () => {
  const connection = await createConnection();
  const currentDb = await getRepository(Event).find();
  if (currentDb.length < 1) {
    await connection.manager.save(
      connection.manager.create(Event, {
        date: new Date().toISOString(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
      })
    );
  }
};

export default Seed;
