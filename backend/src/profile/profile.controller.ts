import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ActiveUsr } from 'src/auth/decorator/activeUser.decorator';

@Controller('profile')
export class ProfileController {
   constructor(private readonly profileService: ProfileService) { }


   //* ------------------- GET PROFILE ------------------------
   @Get()
   async getProfile(@ActiveUsr('sub') userId: number) {
      const profile = await this.profileService.findOne(userId)
      return { status: 'success', data: [profile] }
   }


   //* ------------------- UPDATE PROFILE ------------------------
   @Patch()
   async updateProfile(@Body() updateProfileDto: UpdateProfileDto, @ActiveUsr('sub') userId: number) {
      await this.profileService.updateProfile(updateProfileDto, userId)
      return { status: 'success', message: 'Profile has been updated successfully!!' }
   }
}
