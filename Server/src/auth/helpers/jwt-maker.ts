import { get } from 'config';
import { sign } from 'jsonwebtoken';

let createToken = (fb_id: number | string, id?: string, name?: string, email?: string | null) => {
  const expiresIn = 60 * 60 * 24 * 60,
    secretOrKey = get<string>('secrets.jwtStr');
  let user = { id, fb_id, name, email };
  return sign(user, secretOrKey, { expiresIn });
}

export { createToken }