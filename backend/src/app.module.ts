import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envValidator from './config/validationConfig';
import dbConfig from './config/dbConfig';
import appEnvConfig from './config/appEnv.config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

const env = process.env.NODE_ENV;
console.log(env);

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: !env ? '.env' : `.env.${env.trim()}.local`,
         load: [dbConfig, appEnvConfig],
         isGlobal: true,
         validationSchema: envValidator
      }), TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: (appConfig: ConfigService) => ({
            type: 'postgres',
            autoLoadEntities: appConfig.get('database.autoLoadEntities'),
            synchronize: appConfig.get('database.synchronize'),
            username: appConfig.get('database.username'),
            password: appConfig.get('database.password'),
            database: appConfig.get('database.name'),
            host: appConfig.get('database.host'),
            port: appConfig.get('database.port')
         })
      }), TweetModule, UserModule, ProfileModule, AuthModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule { }
