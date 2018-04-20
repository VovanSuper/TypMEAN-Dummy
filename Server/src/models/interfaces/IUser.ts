import { IEntity } from './'

export interface IUser extends IEntity {
  [key: string]: string | string[] | number | object;
  
  username?: string;
  age?: number;
  email?: string;
  location?: string;
  gender?: string;
  registered?: string,
  participating?: string[];
  interests?: string[];
  fb_id?: string,
  fb_token?: string,
  fb_email?: string,
  avatarUrl?: string
}
