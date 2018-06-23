import { IEntity } from './IEntity';

export interface IEvent extends IEntity {
  [key: string]: string | string[] | number | object;

  description?: string;
  location?: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  createdBy?: object;
  participants?: object[];
}
