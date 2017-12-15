import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {UsersService} from './users.service';
import {expect} from 'chai';

describe('UsersService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        UsersService
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: UsersService;
  beforeEach(() => {
    service = module.get(UsersService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
