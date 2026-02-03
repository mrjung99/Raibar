import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import authConfig from './config/authConfig';

@Injectable()
export class AuthService {
   constructor(
      @Inject(forwardRef(() => UserService))
      private readonly userService: UserService,
      private readonly hashingProvider: HashingProvider,
      @Inject(authConfig.KEY)
      private readonly authConfiguration: ConfigType<typeof authConfig>,
      private readonly jwtService: JwtService,
   ) { }

   //* --------------- SIGNUP ---------------------
   async signUp(createUserDto: CreateUserDto) {
      return this.userService.createUser(createUserDto)
   }

   //* ---------------- LOGIN ----------------------
   async login(loginDto: LoginDto) {
      const user = await this.userService.findUserByEmail(loginDto.email)

      const isPasswordMatched = await this.hashingProvider.comparePassword(
         loginDto.password,
         user.password
      )
      if (!isPasswordMatched) {
         throw new UnauthorizedException("Password does not matched!!")
      }

      const token = await this.jwtService.signAsync({
         sub: user.id,
         email: user.email
      },
         {
            secret: this.authConfiguration.secret,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer
         })

      return token
   }
}
