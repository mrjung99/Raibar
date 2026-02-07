import {
   forwardRef,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import authConfig from './config/authConfig';
import refreshConfig from './config/refreshConfig';

@Injectable()
export class AuthService {
   constructor(
      @Inject(forwardRef(() => UserService))
      private readonly userService: UserService,

      private readonly hashingProvider: HashingProvider,

      @Inject(authConfig.KEY)
      private readonly authConfiguration: ConfigType<typeof authConfig>,

      @Inject(refreshConfig.KEY)
      private readonly refreshConfiguration: ConfigType<typeof refreshConfig>,

      private readonly jwtService: JwtService,
   ) { }

   //* --------------- SIGNUP ---------------------
   async signUp(createUserDto: CreateUserDto) {
      return this.userService.createUser(createUserDto);
   }

   //* ---------------- VALIDATE USER ----------------------
   async validateUser(email: string, password: string) {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
         throw new UnauthorizedException('Invalid credentials!!');
      }

      const isPasswordMatched = await this.hashingProvider.comparePassword(
         password,
         user.password,
      );

      if (!isPasswordMatched) {
         throw new UnauthorizedException('Invalid credentials!!');
      }

      if (user && isPasswordMatched) {
         const { password: _, ...withoutPass } = user;
         return withoutPass;
      }

      return null;
   }

   //* ---------------- LOGIN ----------------------
   async login(user: any) {
      const payload = { sub: user.id, email: user.email };

      const accessToken = await this.jwtService.signAsync(
         payload,
         this.authConfiguration,
      );

      const refreshToken = await this.jwtService.signAsync(payload, this.refreshConfiguration)

      return { status: 'success', token: { accessToken, refreshToken } };
   }

   //*---------------- REFRESH TOKEN -----------------
   async getRefreshToken(id: number) {
      const payload = { sub: id }
      return await this.jwtService.signAsync(payload, this.authConfiguration)
   }
}
