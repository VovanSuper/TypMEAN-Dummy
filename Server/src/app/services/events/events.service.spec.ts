import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {EventsService} from './events.service';
import {expect} from 'chai';

describe('EventsService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        EventsService
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: EventsService;
  beforeEach(() => {
    service = module.get(EventsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
