import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { EventsController } from './events.controller';
import { expect } from 'chai';

describe('EventsController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        EventsController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: EventsController;
  beforeEach(() => {
    controller = module.get(EventsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });

  it('all: should return events.json from Sever-mock dir', () => {
    expect(controller.all()).to.be.contain('events');
  })
});
