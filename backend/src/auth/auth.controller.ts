import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AllowAccess } from './decorator/allowAccess.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* ------------------ SIGNUP ----------------------
  @Post('signup')
  @AllowAccess()
  async signUP(@Body() createUerDto: CreateUserDto) {
    await this.authService.signUp(createUerDto);
    return { status: 'success', message: 'Account is created successfully!!' };
  }

  //* --------------- LOGIN --------------------------
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @AllowAccess()
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any) {
    const token = await this.authService.login(req.user);

    return { status: 'success', message: 'Logged in successfully!!', token };
  }
}
