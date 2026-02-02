import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   controllers: [UserController],
   providers: [UserService],
   imports: [TypeOrmModule.forFeature([User, Profile, Tweet]), forwardRef(() => AuthModule)],
   exports: [UserService]
})
export class UserModule { }
