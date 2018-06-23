import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class EventEntity {
  @ObjectIdColumn() id: ObjectID;

  @Column() name: string;

  @Column() description?: string;

  @Column() location: string;

  @Column()
  @CreateDateColumn({ default: new Date() })
  startDate: Date;

  @Column()
  @CreateDateColumn({ default: new Date() })
  endDate: Date;

  @Column()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @Column(type => UserEntity)
  createdBy: ObjectID;

  @Column(type => UserEntity)
  participants: ObjectID[];
}
