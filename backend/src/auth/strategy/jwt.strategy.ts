import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../config/authConfig';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      @Inject(authConfig.KEY)
      private readonly auth: ConfigType<typeof authConfig>,
   ) {
      const secret = auth.secret
      if (!secret) throw new Error("JWT_TOKEN_SECRET is not defined!!")

      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: secret
      });
   }

   validate(payload: any) {
      console.log('payload jwt', payload);

      return { userId: payload.sub, email: payload.email };
   }
}
