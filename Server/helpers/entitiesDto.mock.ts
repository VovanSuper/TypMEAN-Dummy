import { EventBaseDto, UserBaseDto, IUser, IEvent } from "../src/models/";

export const events: EventBaseDto[] = [
  {
    name: 'Test event 1',
    description: 'Some custom event for testings (the first one)',
    place: 'In memory',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: new Date()
  },
  {
    name: 'Test event 2',
    description: 'Some custom event for testings (yet another one)',
    place: 'In Database',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: new Date()
  }
];

export const eventIEvent : IEvent = {
  name: 'test IEvent',
  startDate: (new Date()).toJSON(),
  endDate: (new Date()).toJSON(),
  createdAt: (new Date()).toJSON(),
  place: 'RF, Kaluga, Terepets, Sport HOUSE'
}
export const userBaseDto: UserBaseDto = {
  name: 'Vladimir Ovsyukov', 
  username: 'Vovan_Super',
  age: 34,
  email: 'vovansuper@mail.ru',
  gender: 'mail',
  location: 'RF, Kaluga',
  interests: ['football', 'sport fishing', 'chess', 'boxing'],
  registered: new Date(),
  participating: []
}

export const userIUser: IUser = {
  username: 'Vovan Super',
  name: 'Vovan the Suppa best',
  age: 34,
  email: 'vovansuper@mail.ru',
  interests: ['joggin', 'swimming'],
  gender: 'male',
  location: 'RF, Kaluga',
  registered: (new Date()).toJSON()
};