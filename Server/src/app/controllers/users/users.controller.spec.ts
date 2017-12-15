import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {UsersController} from './users.controller';
import {expect} from 'chai';

describe('UsersController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        UsersController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: UsersController;
  beforeEach(() => {
    controller = module.get(UsersController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
