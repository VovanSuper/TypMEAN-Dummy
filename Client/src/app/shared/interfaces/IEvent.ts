import { IEntity } from './';

export interface IEvent extends IEntity {
  description?: string;
  place?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  createdAt?: Date | string;
  createdBy?: string;
  participants?: IEntity[] | string[];
}
