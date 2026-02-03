import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUsr } from 'src/auth/decorator/activeUser.decorator';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) { }


   @Get()
   async getUserById(@ActiveUsr('sub') userId: number) {
      return await this.userService.findUserById(userId)
   }

}
