import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/authConfig';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import refreshConfig from './config/refreshConfig';
import { RefreshJwtStrategy } from './strategy/refreshJwt.strategy';

@Module({
   controllers: [AuthController],
   providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
      RefreshJwtStrategy,
      {
         provide: HashingProvider,
         useClass: BcryptProvider,
      },
   ],
   imports: [
      forwardRef(() => UserModule),
      ConfigModule.forFeature(authConfig),
      ConfigModule.forFeature(refreshConfig),
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get('auth.secret'),
            signOptions: {
               audience: configService.get('auth.audience'),
               issuer: configService.get('auth.issuer'),
               expiresIn: configService.get('auth.expiresIn')
            }
         }),
      }),
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get('refresh-auth.secret'),
            signOptions: {
               audience: configService.get('refresh-auth.audience'),
               issuer: configService.get('refresh-auth.issuer'),
               expiresIn: configService.get('refresh-auth.expiresIn')
            }
         })
      })
   ],
   exports: [HashingProvider],
})
export class AuthModule { }
