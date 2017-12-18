import { Controller, Body, Post, Request, Response } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { get } from 'config';

import { AuthService } from '../../shared/services/';

@Controller('/auth')
export class AuthController {

  constructor(private authSvc: AuthService) { }

  @Post('facebook')
  async fbAuth( @Request() req) {
    return {
      operationStatus: 'Ok',
      data: {
        jwt_token: req['jwt_token'],
        name: req['name'] || null,
        email: req['email'] || null
      }
    }
  }
}