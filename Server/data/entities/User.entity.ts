import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn() id: ObjectID;

  @Column() fb_id: string;

  @Column() fb_token: string;

  @Column() fb_email: string;

  @Column() username?: string;

  @Column() name?: string;

  @Column({ default: 0 })
  age?: number;

  @Column('enum', { enum: ['male', 'female'], default: 'male' })
  gender: string;

  @Column() email?: string;

  @Column() location?: string;

  @Column() avatarUrl?: string;

  @Column()
  @CreateDateColumn({ default: new Date() })
  registered: Date;

  @Column('simple-array', { default: [] })
  interests?: string[];

  @Column('simple-array', { default: [] })
  participating?: string[];
}
