import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUsr } from 'src/auth/decorator/activeUser.decorator';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) { }

   //* ------------------ GET USER -------------------------
   @Get()
   async getUserById(@ActiveUsr('sub') userId: number) {
      return await this.userService.findUserById(userId)
   }


   //* ------------------ DELETE USER -------------------------
   @Delete()
   async deleteUser(@ActiveUsr('sub') userId: number) {
      await this.userService.deleteUser(userId)
      return { status: 'success', message: 'Account deleted successfully.' }
   }
}
