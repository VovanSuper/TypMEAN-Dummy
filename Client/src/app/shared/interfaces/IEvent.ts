import { IEntity } from './';

export interface IEvent extends IEntity {
  place?: string;
  description?: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  createdBy?: string;
  participants?: IEntity[];
}
