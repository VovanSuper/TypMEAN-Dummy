import { Entity } from './entity';
import { CoreObj, PlainObj, Ctor, coreObjFieldToJson, serializeToCoreObj } from '../../../helpers/extensions';
import { classToPlainFromExist, plainToClassFromExist } from 'class-transformer';
import { EventBaseDto } from '../dto/base_event.dto';
import { UserBase } from './base_user';

export class EventBase {
  [key: string]: any;

  constructor(
    public readonly eventname: string,
    public readonly place: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly description?: string,
    public readonly createdAt?: Date,
    public readonly createdBy?: UserBase,
    public readonly participants?: UserBase[]
  ) { }

  static mixin<TBase extends Ctor>(Base: TBase, Ext: EventBase) {
    return class extends Base {
      constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(Base.prototype, Object.create(EventBase.prototype));
        Object.getOwnPropertyNames(Ext).forEach(name => this[name] = Ext[name]);
      }
    }
  }

  //method used by JSON.stringify internally ( if presents in an object )
  toJSON() {
    return Object.assign({}, this, {
      startDate: this.startDate.toJSON(),
      endDate: this.endDate.toJSON(),
      createdAt: this.createdAt.toJSON()
    })
  }

  // private toDtoIter<T extends CoreObj>(this: T): IterableIterator<PlainObj>
  // private * toDtoIter<T extends CoreObj>(this: T) {
  //   for (let field in <T>this) {
  //     yield coreObjFieldToJson(this, field);
  //   }
  // }

  // toObject<T extends CoreObj>(param: T) {
  //   return classToPlainFromExist(param, this);
  // }

  // fromObject<T extends PlainObj>(param: T) {
  //   return plainToClassFromExist(this, param);
  // }


  static fromDto<T extends EventBaseDto>(eventDto: T) {
    return serializeToCoreObj(EventBase, eventDto);
  }

  static toDto<T extends EventBase>(event: T): EventBaseDto {
    return serializeToCoreObj(EventBaseDto, event) as EventBaseDto;
  }

  static fromModel<T extends {}>(model: T) {
    return serializeToCoreObj(EventBase, model)
  }

}