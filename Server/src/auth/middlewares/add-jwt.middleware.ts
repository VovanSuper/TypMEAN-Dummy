import { sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { AuthService } from '../../shared/services/index';

@Middleware()
export class AddTokenMiddleware implements NestMiddleware {

  constructor(private authSvc: AuthService) { }

  resolve(...args: any[]): ExpressMiddleware | Promise<ExpressMiddleware> {
    return (req: Request, resp: Response, next: NextFunction) => {
      if (!req.user) {
        return resp.status(401).send({
          operationStatus: 'Not Authenticated',
          err: 'User is not authencticated'
        })
      }
      req['jwt_token'] = this.authSvc.createToken(req.user['fb_id'], req.user['name']);
      return next();
    }
  }

}