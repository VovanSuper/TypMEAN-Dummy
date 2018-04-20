import { IEntity } from './'

export interface IUser extends IEntity {
  username?: string;
  age?: number;
  email?: string;
  location?: string;
  gender?: string;
  avatarUrl?: string;
  registered?: Date | string,
  participating?: IEntity[] | string[];
  interests?: IEntity[] | string[] | string;
}