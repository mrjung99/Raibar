import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('signup')
   async signUP(@Body() createUerDto: CreateUserDto) {
      await this.authService.signUp(createUerDto);
      return { status: 'success', message: 'Account is created successfully!!' }
   }

   @Post('login')
   @HttpCode(HttpStatus.OK)
   async login(@Body() loginDto: LoginDto) {
      const token = await this.authService.login(loginDto)

      return { status: 'success', message: "Logged in successfully!!", token }
   }

}
