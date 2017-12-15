import { readFileSync, appendFileSync } from 'fs';
import { resolve } from 'path';
import { Controller, Get, Post, Body, Param, NotFoundException, NotAcceptableException, Delete, Patch } from '@nestjs/common';
import { UsersService } from '../../shared/services/users.service';
import { Event } from '../../../data/entities/Event';
import { User } from '../../../data/entities/index';

@Controller('users')
export class UsersController {

  constructor(public usersSvc: UsersService) { }

  @Get()
  async getAll() {
    let data = await this.usersSvc.repo.find();
    return {
      operationStatus: 'Found',
      data: data
    }
  }

  @Get(':id')
  async getById( @Param('id') id: string) {
    let event = await this.usersSvc.repo.findOneById(id)
    if (!event)
      throw new NotFoundException(`No event with id ${id}`);

    return {
      operationStatus: 'Found',
      data: event
    }
  }

  @Post() create( @Body() userDto: User) {
    if (!userDto.name || !userDto.email)
      throw new NotAcceptableException('Model state is invalid', 'User entity should have name and email');

    console.dir(userDto);
    let newUser = this.usersSvc.repo.save(userDto)
    return {
      operationStatus: 'Created',
      data: newUser
    }
  }

  @Patch(':id') async patchById( @Param('id') id: string, @Body() userDto: User) {
    let user = await this.usersSvc.repo.findOneById(id);
    if (!user)
      throw new NotFoundException(`No event with id ${id}`);

    await this.usersSvc.repo.updateById(id, userDto);
    return {
      operationStatus: 'Patched',
      data: `Succesfully pathced user ${id}`
    }

  }

  @Delete(':id') async deleteById( @Param('id') id: string) {
    await this.usersSvc.repo.deleteById(id);
    return {
      operationStatus: `Succesfully Deleted`,
      data: `Deleted user ${id}`
    }
  }
}
