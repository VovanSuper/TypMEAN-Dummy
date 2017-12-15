export class UserDto {
  readonly id: number | string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly age: number;
  readonly place?: {
    readonly city: string;
    readonly address: string;
  };
  readonly description?: string;
  readonly date?: Date;
  readonly startTime?: Date;
  readonly endTime?: Date;
  readonly createdAt?: Date;
  readonly createdBy?: string;
  readonly participants?: {
    id: string;
    name: string;
  };

}