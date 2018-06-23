import 'reflect-metadata';
import { Service, Container } from 'typedi';
import {
  MongoRepository,
  Repository,
  EntityRepository,
  Connection,
} from 'typeorm';
import { InjectRepository, InjectConnection } from 'typeorm-typedi-extensions';
import { EventEntity } from '../entities/';
import { EventDto } from '../../src/models';
import { IRepository } from './interfaces/IRepository';

@Service({ global: true, id: 'EventRepo' })
export class EventService implements IRepository<EventEntity> {
  // constructor(private readonly eventRepo: MongoRepository<EventEntity>) { }
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: MongoRepository<EventEntity>,
  ) {}

  async getById(id: string): Promise<EventEntity> {
    return await this.eventRepo.findOne(id);
  }

  async all(): Promise<EventEntity[]> {
    return await this.eventRepo.find({});
  }
}
