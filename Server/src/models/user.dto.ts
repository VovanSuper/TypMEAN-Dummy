import { ObjectID } from "typeorm";
import { FbUserDto } from "./fb_user.dto";

export class UserDto extends FbUserDto {
  readonly id?: number | string | ObjectID | null;
  readonly name: string;
  readonly username?: string;
  readonly email?: string;
  readonly age?: number;
  readonly location?: string;
  readonly avatartUrl?: string;
  readonly interests?: string | string[] | null;
  readonly participating?: string | string[] | ObjectID[] | null;
}