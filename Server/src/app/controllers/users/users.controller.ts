import { resolve } from 'path';
import { Controller, Get, Post, Body, NotFoundException, Param } from '@nestjs/common';
import { UserDto } from '../../models/user.dto';

@Controller('users')
export class UsersController {
  // usersJson = '';
  // users: UserDto[] = [];
  // userssJsonPath = resolve(process.cwd(), 'Server-mock/users.json');

  constructor() {
    // this.usersJson = readFileSync(this.userssJsonPath).toString();
    // this.users = (JSON.parse(this.usersJson))['users'];
  }

  @Get() all() {
    // let res = {
    //   operationStatus: 'Found',
    //   data: this.users
    // }
    // return JSON.stringify(res);
  }

  @Get(':id') getById( @Param('id') id: string) {
    // let demanded = this.users.filter(user => user['id'] == id)[0];
    // if (!demanded) {
    //   throw new NotFoundException(`No user with id ${id}`);
    // }

    // return {
    //   operationStatus: 'Found',
    //   data: demanded
    // }
  }

  @Post() create( @Body() req: UserDto) {
    // appendFileSync(this.userssJsonPath, JSON.stringify(req), { encoding: 'utf-8' });
  }
}
