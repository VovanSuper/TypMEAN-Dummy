import { classToPlainFromExist, plainToClassFromExist, classToClass, plainToClass, classToPlain } from "class-transformer";
import { Ctor, serializeToCoreObj } from "../../../helpers/";
import { IUser } from "../interfaces/";
import { UserBaseDto } from "../dto/base_user.dto";

export class UserBase {
  [key: string]: any;

  constructor(
    public readonly gender: string,
    public readonly age?: number,
    public readonly username?: string,
    public readonly email?: string,
    public readonly location?: string,
    public readonly interests?: string[],
    public readonly participating?: string[],
    public readonly registered?: Date
  ) { }

  static mixin<TBase extends Ctor>(Base: TBase, Ext: UserBase) {
    return class extends Base {
      constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(Base.prototype, Object.create(UserBase.prototype));
        Object.getOwnPropertyNames(Ext).forEach(name => {
          this[name] = Ext[name]
        });
      }
    }
  }

  //method used by JSON.stringify internally ( if presents in an object )
  toJSON() {
    return Object.assign({}, this, { registered: this.registered.toJSON() })
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


  static fromDto<T extends UserBaseDto>(userDto: T) {
    return serializeToCoreObj(UserBase.prototype, userDto);
  }

  static toDto<T extends UserBase>(user: T): UserBaseDto {
    return serializeToCoreObj(UserBaseDto.prototype, user) as UserBaseDto;
  }

  static fromModel<T extends {}>(model: T) {
    return serializeToCoreObj(UserBase, model)
  }
}