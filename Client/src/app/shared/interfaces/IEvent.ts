import { IEntity } from './';

export interface IEvent extends IEntity {
  place?: {
    city: string;
    address: string;
  };
  description?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  createdAt?: Date;
  createdBy?: string;
  participants?: IEntity[];
}
