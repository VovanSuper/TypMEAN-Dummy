import { UserEntity, EventEntity } from '../data/entities';
import { MongoRepository, Connection } from 'typeorm';

export const setUpTestDb = async (
  userRepo: MongoRepository<UserEntity>,
  eventRepo: MongoRepository<EventEntity>,
) => {
  let user1 = userRepo.create({
    name: 'Vovan Ovsyukov',
    age: 34,
    email: 'vovansuper@mail.ru',
    gender: 'male',
    interests: ['football', 'boxing', 'sambo', 'swimming', 'jogging'],
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
  });
  let user2 = userRepo.create({
    name: 'Manne Kaila',
    age: 38,
    email: 'manne.kaila@mail.ru',
    gender: 'male',
    interests: ['football', 'boxing', 'sambo', 'swimming', 'jogging'],
    location: 'Finland, Kuopio, Sarikiniementid, 2-22',
  });
  let user3 = userRepo.create({
    name: 'Andrey Rezinkin',
    age: 33,
    email: 'and_rezinking@gmail.com',
    gender: 'male',
    interests: ['swimming', 'jogging'],
    location: 'Finland, Helsinki, Kruununtie, 2B',
  });
  let user4 = userRepo.create({
    name: 'Mama',
    age: 65,
    email: 'natalya54@mail.ru',
    gender: 'female',
    interests: ['eating', 'walking'],
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
  });
  let user5 = userRepo.create({
    name: 'Alexander ',
    age: 71,
    email: 'ovs47@mail.ru',
    gender: 'mail',
    interests: ['eating', 'walking', 'football', 'hockey', 'swimming'],
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
  });

  await userRepo.save([user1, user2, user3, user4, user5]);

  let event1 = eventRepo.create({
    name: 'Create DB',
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
    description:
      'The very first task to create entities and insert to Database',
  });
  event1.createdBy = user1.id;
  event1.participants = [user1.id];

  let event2 = eventRepo.create({
    name: 'Work out in inair gym',
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
    description: 'Do exersises in the outside ',
  });
  event2.participants = [user1.id, user2.id];
  event2.createdAt = new Date();
  event2.createdBy = user1.id;

  let event3 = eventRepo.create({
    name: 'Go to party once',
    location: 'Finland, Helsinki center',
    description:
      'The very first task to create entities and insert to Database',
  });
  event3.participants = [user2.id, user3.id];
  event3.createdBy = user2.id;

  let event4 = eventRepo.create({
    name: 'Prepare bliny',
    location: 'RF, Kaluga, blvd. Motorostroiteley, 3-13',
    description: 'The baking Bliny with Mother',
  });
  event4.participants = [user1.id, user4.id];
  event4.createdBy = user4.id;

  let event5 = eventRepo.create({
    name: 'Get togaether',
    location: 'RF, Moscow, city center',
    description: "Once have a great all friends' party",
  });
  event5.participants = [user1.id, user2.id, user3.id, user4.id, user5.id];
  event5.createdBy = user1.id;

  await eventRepo.save([event1, event2, event3, event4, event5]);

  return [
    user1,
    user2,
    user3,
    user4,
    user5,
    event1,
    event2,
    event3,
    event4,
    event5,
  ];
};

export const tearDownTestDb = async (
  userRepo: MongoRepository<UserEntity>,
  eventRepo: MongoRepository<EventEntity>,
) => {
  await userRepo.deleteMany({});
  return await eventRepo.deleteMany({});
};
