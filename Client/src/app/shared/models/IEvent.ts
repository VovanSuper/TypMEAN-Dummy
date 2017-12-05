import { IEntity } from './IEntity';
import { IUser } from './index';

export interface IEvent extends IEntity {
  date: Date;
  place: {
    city: string;
    address: string;
  }
  participants?: IUser[]
}