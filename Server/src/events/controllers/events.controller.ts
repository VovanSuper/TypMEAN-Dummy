import { readFileSync, appendFileSync } from 'fs';
import { resolve } from 'path';
import { Controller, Get, Post, Body, Param, NotFoundException, Headers, Request } from '@nestjs/common';
import { ServerRequest } from 'http';
import { EventDto } from '../../models/event.dto';
import { EventsService } from '../services/events.service';
import { Event } from '../../../data/entities/Event';
import * as express from 'express';
import { UsersService } from '../../shared/services/users.service';

@Controller('events')
export class EventsController {

  constructor(public eventsSvc: EventsService, public usersSvc: UsersService) { }

  @Get()
  async getAll() {
    let events = await this.eventsSvc.repo.find();
    let data = [];
    console.dir(events[0]);

    for (let event of events) {
      let creator = await this.usersSvc.repo.findOneById(event.createdBy);
      console.dir(creator);
      event['createdBy'] = creator;
      data.push(event);
    }

    return {
      operationStatus: 'Found',
      data: data
    }
  }

  @Get(':id')
  async getById( @Param('id') id: string) {
    let event = await this.eventsSvc.repo.findOneById(id)
    if (!event)
      throw new NotFoundException(`No event with id ${id}`);

    return {
      operationStatus: 'Found',
      data: event
    }
  }

  @Post() create( @Request() req: express.Request, @Body() event: EventDto) {
    let userId = req.user;
    console.log(userId);
    console.log(userId);
    console.dir(event);

  }
}
