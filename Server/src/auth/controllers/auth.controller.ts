import { Controller, Body, Post, Request } from '@nestjs/common';
import { createToken } from '../helpers/jwt-maker';
import * as express from 'express';

@Controller('/auth')
export class AuthController {

  constructor() { }

  @Post('facebook')
  async fbAuth( @Request() req: express.Request) {
    console.log(`auth.ctrl->@Post fbAuth():: req.user : ${JSON.stringify(req.user)}`);

    let token = createToken(req.user.fb_id, req.user.id, req.user.name, req.user.email);
    console.log('Token is: ', token);
    
    return {
      operationStatus: 'Ok',
      data: {
        token: token
      }
    }
  }
}