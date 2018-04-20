import { UserBaseDto } from './base_user.dto';
import { IUser } from '../interfaces';
import { PlainObj, serializeObjFromJson, serializeObjToJson, serializeToCoreObj } from '../../../helpers';
import { EventBaseDto } from './base_event.dto';

export class UserDto implements UserBaseDto {
  [key: string]: string | string[] | number | Date | EventBaseDto;

  public readonly id: string;
  public readonly name: string;
  public readonly username: string;
  public readonly email: string;
  public readonly age: number;
  public readonly gender: string;
  public readonly location: string;
  public readonly interests: string[];
  public readonly participating: string[];
  public readonly registered: Date;

  static fromInterface<T extends IUser>(user: T): UserDto {
    return serializeObjFromJson(UserDto.prototype, user) as UserDto ;
  }

  static toInterface<T extends UserDto>(user: T): Partial<IUser> {
    return serializeObjToJson(UserDto.prototype, user);
  }

  static fromEntity<T extends {}>(entity: T) {
    return serializeToCoreObj(UserDto.prototype, entity);
  }
}