import { ObjectID } from "typeorm";

export class UserDto {
  readonly id?: number | string | ObjectID | null;
  readonly fb_id?: number | string | null;
  readonly fb_token?: string;
  readonly name: string;
  readonly username?: string;
  readonly email?: string;
  readonly age?: number;
  readonly location?: string;
  readonly avatartUrl?: string;
  readonly interests?: string | string[] | null;
  readonly participating?: string | string[] | ObjectID[] | null;
}