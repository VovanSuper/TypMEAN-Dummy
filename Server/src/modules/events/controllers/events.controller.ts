import { readFileSync, appendFileSync } from 'fs';
import { resolve } from 'path';
import { Controller, Get, Post, Body, Param, NotFoundException, Headers, Request, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { ServerRequest } from 'http';
import { EventDto } from '../../../models/event.dto';
import { Event } from '../../../../data/entities/Event';
import * as express from 'express';
import { UsersService, EventsService } from '../../shared/services/';

@Controller('events')
export class EventsController {

  constructor(public eventsSvc: EventsService, public usersSvc: UsersService) { }

  @Get()
  async getAll() {
    try {
      let events = await this.eventsSvc.all();
      if (!events)
        throw new NotFoundException(`No events in database;`);

      return {
        operationStatus: 'Found',
        data: events
      }
    } catch (e) {
      return {
        operationStatus: 'Fail',
        err: `No events found.\n  ${JSON.stringify(e)}`
      }
    }
  }

  @Get(':id')
  async getById( @Param('id') id: string) {
    try {
      let event = await this.eventsSvc.oneById(id);
      if (!event)
        throw new NotFoundException(`No event with id ${id}`);

      return {
        operationStatus: 'Found',
        data: event
      }
    } catch (e) {
      return {
        operationStatus: 'Fail',
        err: `No event with id ${id} found.\n ${JSON.stringify(e)}`
      }
    }
  }

  @Post()
  async create( @Request() req: express.Request, @Body() event: EventDto) {
    try {
      
      let user = req.user || null;
      console.dir(event.participants);
      console.log(event.participants);
      let parts = Array.from(event.participants);
      console.log(`Event.participants is array? = ${Array.isArray(event.participants)} `);
      console.log(`${parts} is type of  ${typeof parts}`);
      
      return console.log(typeof event.participants);

      if (!user)
        throw new BadRequestException('Not authenticated', 'No req.user - not authenticated')

      if (!event || !event.name.trim() || !event.place.trim() || !event.description)
        throw new NotAcceptableException('Invalid Event model', 'Event should have name, place and descriton at least (provide dates too)');

      let newEvent = await this.eventsSvc.create(event, user.id);

      return {
        operationStatus: 'Created',
        data: newEvent
      }
    } catch (e) {
      return {
        operationStatus: 'Fail',
        err: `Failed to create event.${JSON.stringify(e)}`
      }
    }
  }
}
