import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Event } from "../entity/Event";
import { validate } from "class-validator";

export class EventController {
  // TODO expose controller as function
  //! Add DI for easier mocking.

  private _eventRepository = getRepository(Event);

  async all(request: Request, response: Response, next: NextFunction) {
    const result = await this._eventRepository.find();
    if (!result) {
      response.status(404).send();
    }
    response.send(result);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const result = await this._eventRepository.findOne(request.params.id);
    if (result === undefined) {
      return response.status(404).send();
    }
    return response.send(result);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const eventInDB = await this._eventRepository.findOne(request.params.id);
    if (!eventInDB) return response.status(404).send();

    const payload = new Event();
    payload.firstName = request.body.firstName ?? eventInDB.firstName;
    payload.lastName = request.body.lastName ?? eventInDB.lastName;
    payload.email = request.body.email ?? eventInDB.email;
    payload.date = request.body.date ?? eventInDB.date;

    await this._eventRepository.update(request.params.id, payload);
    const result = await this._eventRepository.findOne(request.params.id);
    response.send(result);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const payload = new Event();
    payload.firstName = request.body.firstName || null;
    payload.lastName = request.body.lastName || null;
    payload.email = request.body.email || null;
    payload.date = request.body.date || null;

    const errors = await validate(payload, { forbidUnknownValues: true });

    if (errors.length > 0) {
      response.status(422).send("422, wrong content.");
    } else {
      const result = await this._eventRepository.save(payload);
      response.status(201).send(result);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const eventInDB = await this._eventRepository.findOne(request.params.id);

    if (!eventInDB) {
      return response.status(404).send();
    } else {
      let eventToRemove = await this._eventRepository.findOne(
        request.params.id
      );
      await this._eventRepository.remove(eventToRemove);

      return response.status(204).send();
    }
  }
}
