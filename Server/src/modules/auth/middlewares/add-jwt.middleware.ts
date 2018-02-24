import { sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { get } from 'config';
import * as jwt from 'jsonwebtoken'

let genToken = (req: any) => {
  return this.createToken(req.user['fb_id'], req.user['_id'], req.user['name'], req.user['email']);
}

let createToken = (fb_id: number | string, id?: string, name?: string, email?: string | null) => {
  const expiresIn = 60 * 60 * 24 * 60,
    secretOrKey = get<string>('secrets.jwtStr');
  let user = { id, fb_id, name, email };
  return jwt.sign(user, secretOrKey, { expiresIn });
}

let AddTokenMiddleware = (req, resp, next) => {
  console.log('add-jwt.midware called');
  console.dir(req === undefined);
  console.dir(req['user']);
}

export { AddTokenMiddleware }