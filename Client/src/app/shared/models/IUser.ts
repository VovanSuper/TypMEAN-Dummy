import { IEvent } from "./IEvent";
import { IEntity } from "./IEntity";

export interface IUser extends IEntity {
  age: number;
  avatarUrl: string;
  residence: {
    country: string;
    city: string;
    address: string;
  },
  registered: Date;
  interests?: string[];
  participating?: IEvent[]
}