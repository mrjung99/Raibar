import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshConfig from '../config/refreshConfig';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
   constructor(
      @Inject(refreshConfig.KEY)
      private readonly refreshJwtConfig: ConfigType<typeof refreshConfig>,
   ) {
      const secret = refreshJwtConfig.secret
      if (!secret) throw new Error("REFRESH_TOKEN_SECRET is not defined!!")

      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: secret,
         passReqToCallback: true
      });
   }

   validate(payload: any) {
      console.log('refresh', payload);

      return { userId: payload.sub };
   }
}
