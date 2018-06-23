import {
  serializeObjToJson,
  serializeObjFromJson,
  PlainObj,
  serializeToCoreObj,
} from '../../../helpers/extensions';
import {
  classToPlainFromExist,
  plainToClassFromExist,
} from 'class-transformer';
import { IEvent } from '../interfaces/';
import { UserBaseDto } from './base_user.dto';
import { UserDto } from './user.dto';

export class EventBaseDto {
  [key: string]: string | string[] | number | Date | UserBaseDto | UserDto[];

  public readonly name: string;
  public readonly location: string;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly description?: string;
  public readonly createdAt?: Date;
  public readonly createdBy?: UserBaseDto;
  public readonly participants?: UserDto[];

  static fromInterface<T extends IEvent>(event: T): EventBaseDto {
    return serializeObjFromJson(EventBaseDto.prototype, event) as EventBaseDto;
  }

  static toInterface<T extends EventBaseDto>(eventDto: T): Partial<IEvent> {
    return serializeObjToJson(EventBaseDto.prototype, eventDto);
  }

  static fromEntity<T extends {}>(entity: T) {
    return serializeToCoreObj(EventBaseDto.prototype, entity);
  }
}
