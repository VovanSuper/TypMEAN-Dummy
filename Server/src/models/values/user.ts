import { UserBase } from "./base_user";
import { FbUser } from "./fb_user";
import { CoreObj, PlainObj, coreObjFieldToJson, serializeToCoreObj } from "../../../helpers";
import { classToPlainFromExist, plainToClassFromExist } from "class-transformer";
import { UserDto } from "../dto/user.dto";

export class User {
  [key: string]: any;

  constructor(
    public readonly id: string,
    // public readonly name: string,
    // public readonly username: string,
    // public readonly email: string,
    // public readonly age: number,
    // public readonly gender: string,
    // public readonly location: string,
    // public readonly interests: string[],
    // public readonly participating: string[]
  ) {
    // super( name, username, email, age, gender, location, interests, participating );
  }


  //method used by JSON.stringify internally ( if presents in an object )

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


  // static fromDto<T extends UserDto>(userDto: T): CoreObj | ThisType<CoreObj> {
  //   return serializeToCoreObj(UserBase, userDto);
  // }

  // toDto<T extends UserBase>(this: T): UserDto {
  //   return serializeToCoreObj(UserDto, this) as UserDto;
  // }

  toPartial<T extends CoreObj>(): Partial<T> {
    return Object.assign({}, this)
  }
}