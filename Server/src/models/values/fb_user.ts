import { Ctor, CoreObj, PlainObj, serializeToCoreObj } from "../../../helpers/extensions";
import { classToPlainFromExist, plainToClassFromExist } from "class-transformer";
import { FbUserDto } from "../dto";

export class FbUser {
  [key: string]: any;

  constructor(
    public fb_id?: string,
    public fb_token?: string,
    public fb_email?: string,
    public avatarUrl?: string
  ) { }

  static mixin<TBase extends Ctor>(Base: TBase, Ext: FbUser) {
    return class extends Base {
      constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(Base.prototype, Object.create(FbUser.prototype));
        Object.getOwnPropertyNames(Ext).forEach(name => {
          this[name] = Ext[name]
        });
      }
    }
  }

  // toObject<T extends CoreObj>(param: T) {
  //   return classToPlainFromExist(param, this);
  // }

  // fromObject<T extends PlainObj>(param: T) {
  //   return plainToClassFromExist(this, param);
  // }


  // fromDto<T extends FbUserDto>(userDto: T): CoreObj | ThisType<CoreObj> {
  //   return serializeToCoreObj(FbUser, userDto);
  // }

  // toDto<T extends FbUser>(this: T): FbUserDto {
  //   return serializeToCoreObj(FbUserDto, this) as FbUserDto;
  // }
}