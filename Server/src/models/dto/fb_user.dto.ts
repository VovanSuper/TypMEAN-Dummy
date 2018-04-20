import { Ctor, PlainObj, serializeObjFromJson, serializeObjToJson, CoreObj } from '../../../helpers/';
import { IUser } from '../interfaces';
import { EventBaseDto } from './base_event.dto';

export class FbUserDto {
  [key: string]: string | string[] | number | Date | EventBaseDto;

  public fb_id?: string;
  public fb_token?: string;
  public fb_email?: string;
  public avatarUrl?: string;

  // static fromInterface<T extends IUser>(fbUser: T): FbUserDto {
  //   return serializeObjFromJson(FbUserDto.prototype, fbUser) as FbUserDto;
  // }

  // static toInterface<T extends FbUserDto>(fbUserDto: T): Partial<IUser> {
  //   return serializeObjToJson(FbUserDto.prototype, fbUserDto);
  // }

}