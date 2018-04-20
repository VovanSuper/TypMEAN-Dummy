import { CoreObj } from "../../../helpers/";
import { EventBase } from "./base_event";

export class Event {
  [key: string]: any;

  constructor(
    public readonly id: string
    // public readonly name: string,
    // public readonly place: string,
    // public readonly startDate: Date,
    // public readonly endDate: Date,
    // public readonly description?: string,
    // public readonly createdAt?: Date,
    // public readonly createdBy?: string,
    // public readonly participants?: string[]
  ) {
    // super(name, place, startDate, endDate, description, createdAt, createdBy, participants);
  }

  toPartial<T extends CoreObj>(): Partial<T> {
    return Object.assign({}, this)
  }
}