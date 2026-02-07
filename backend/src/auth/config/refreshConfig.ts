import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs('refresh-auth', (): JwtSignOptions => {
   if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("REFRESH_TOKEN_SECRET is not defined!!")
   }

   return {
      secret: process.env.REFRESH_TOKEN_SECRET,
      audience: process.env.REFRESH_TOKEN_AUDIENCE,
      expiresIn: '7d',
      issuer: process.env.REFRESH_TOKEN_ISSUER,
   }
});
