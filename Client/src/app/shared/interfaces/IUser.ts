import { IEntity } from './'

export interface IUser extends IEntity {
  username? : string;
  email?: string;
  registered?: Date,
  work_place?: string;
  gender?: string;
  age?: number;
  avatarUrl?: string;
  avatar? : any;
  interests?: string | string[];
  paricipating?: IEntity[]
}
