import { IEntity } from './IEntity';

export interface IEvent extends IEntity {
  [key: string]: string | string[] | number | object;

  description?: string;
  place?: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  createdBy?: object;
  participants?: object[];
}
