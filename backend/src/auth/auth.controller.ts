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
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AllowAccess } from './decorator/allowAccess.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshJwtGuard } from './guards/refreshJwt.guard';
import { ActiveUsr } from './decorator/activeUser.decorator';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   //* ------------------ SIGNUP ----------------------
   @AllowAccess()
   @Post('signup')
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



   //* --------------- REFRESH TOKEN --------------------------
   @UseGuards(RefreshJwtGuard)
   @Post('refresh')
   async refreshToken(@ActiveUsr('sub') userId: number) {
      const token = await this.authService.getRefreshToken(userId)
      return { status: 'success', token: { accessToken: token } }
   }

}
