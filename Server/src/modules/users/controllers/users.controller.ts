import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Patch,
  BadRequestException,
  UnprocessableEntityException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';

import { UserEntityService } from '../../shared/services/users.service';
import { UserDto, UserBaseDto } from '../../../models/';
import { AuthGuard } from '../../shared/middlewares/passport/auth.guard';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersSvc: UserEntityService) {}

  @Get()
  async getAll() {
    let data = await this.usersSvc.all();
    return {
      operationStatus: 'Found',
      data: data,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    let user = await this.usersSvc.oneById(id);
    if (!user) throw new NotFoundException(`No event with id ${id}`);

    return {
      operationStatus: 'Found',
      data: user,
    };
  }

  @Post() // method for registering a very new user?
  async createUser(@Body() user: UserDto) {
    // if (user.fb_id)
    //   throw new BadRequestException('Wrong method', 'Patch method should rather be used to update fb_user');

    try {
      let newUser = await this.usersSvc.create(user);
    } catch (e) {
      console.log(`[users.ctrl->createUser()]:: ${JSON.stringify(e)}`);
      throw new BadRequestException('Error saving new User ', e);
    }
  }

  @Patch(':fb_id')
  async updateFbUser(
    @Param('fb_id') fb_id: string,
    @Body() userDto: UserBaseDto,
  ) {
    console.log(`[users.ctrl->post()]:: userDto posted: ${userDto}`);
    try {
      let updatedUser = await this.usersSvc.updateOneByFbId(fb_id, userDto);

      return {
        operationStatus: 'Existing FbUser Patched with new data',
        data: updatedUser,
      };
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Error saving User', e);
    }
  }

  // @Patch(':id') async patchById( @Param('id') id: string, @Body() userDto: UserDto) {
  //   let user = await this.usersSvc.repo.findOneById(id);
  //   if (!user)
  //     throw new NotFoundException(`No event with id ${id}`);

  //   await this.usersSvc.repo.updateById(id, userDto);
  //   return {
  //     operationStatus: 'Patched',
  //     data: `Succesfully pathced user ${id}`
  //   }
  // }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.usersSvc.deleteById(id);
      return {
        operationStatus: `Deleted`,
        data: `Deleted user ${id}`,
      };
    } catch (e) {
      console.log(`[user.ctrl->DeleteById()]:: ${JSON.stringify(e)}`);
      throw new UnprocessableEntityException('Error deleting User', e);
    }
  }
}
