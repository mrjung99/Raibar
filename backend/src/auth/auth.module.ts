import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';

@Module({
   controllers: [AuthController],
   providers: [AuthService, {
      provide: HashingProvider,
      useClass: BcryptProvider
   }],
})
export class AuthModule { }
