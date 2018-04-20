import { PlainObj, serializeObjFromJson, serializeObjToJson, serializeToCoreObj } from '../../../helpers/';
import { IUser, IEvent } from '../interfaces/';
import { FbUserDto } from './fb_user.dto';
import { EventBaseDto } from './base_event.dto';

// type keysNames = keyof IUser & keyof IEvent;
// type types =  IUser & IEvent;

export class UserBaseDto extends FbUserDto {
  [key: string]: string | string[] | number | Date | EventBaseDto;

  public readonly gender: string;
  public readonly name?: string;
  public readonly username?: string;
  public readonly email?: string;
  public readonly age?: number;
  public readonly location?: string;
  public readonly interests?: string[];
  public readonly participating?: string[];
  public readonly registered?: Date;

  static fromInterface<T extends IUser & PlainObj>(user: T): UserBaseDto {
    return serializeObjFromJson(UserBaseDto.prototype, user) as UserBaseDto;
  }

  static toInterface<T extends UserBaseDto>(userDto: T): IUser {
    return serializeObjToJson(UserBaseDto.prototype, userDto) as IUser;
  }

  static fromEntity<T extends {}>(entity: T) {
    return serializeToCoreObj(UserBaseDto.prototype, entity);
  }
}