import { Token } from 'typedi';

export interface IRepository<T> {
  all(): Promise<T[]>;
  getById(id: string): Promise<T>;
}
