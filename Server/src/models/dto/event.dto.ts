import { EventBaseDto } from './base_event.dto';
import {
  CoreObj,
  PlainObj,
  serializeObjFromJson,
  serializeObjToJson,
  serializeToCoreObj,
} from '../../../helpers/';
import { IEvent } from '../interfaces';
import { UserBaseDto } from './base_user.dto';
import { UserDto } from './user.dto';

export class EventDto implements EventBaseDto {
  [key: string]: string | string[] | number | Date | UserBaseDto | UserDto[];

  public readonly id: string;
  public readonly name: string;
  public readonly location: string;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly description?: string;
  public readonly createdAt?: Date;
  public readonly createdBy?: UserBaseDto;
  public readonly participants?: UserDto[];

  static fromInterface<T extends IEvent>(event: T): EventDto {
    return serializeObjFromJson(EventDto.prototype, event) as EventDto;
  }

  static toInterface<T extends EventDto>(eventDto: T): Partial<IEvent> {
    return serializeObjToJson(EventDto.prototype, eventDto);
  }

  static fromEntity<T extends {}>(entity: T) {
    return serializeToCoreObj(EventDto.prototype, entity);
  }
}
