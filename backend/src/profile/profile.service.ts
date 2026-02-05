import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
   constructor(
      @InjectRepository(Profile)
      private readonly profileRepo: Repository<Profile>
   ) { }


   //* --------------------- GET PROFILE --------------------
   async findOne(userId: number) {
      const profile = await this.profileRepo.findOne({
         where: {
            user: { id: userId }
         }
      })

      if (!profile) {
         throw new NotFoundException("Profile not found.")
      }
      return profile
   }


   //* --------------------- UPDATE PROFILE --------------------
   async updateProfile(updateProfileDto: UpdateProfileDto, userId: number) {
      const profile = await this.findOne(userId)
      Object.assign(profile, updateProfileDto)

      const profileToUpdate = this.profileRepo.create(profile)
      return await this.profileRepo.save(profileToUpdate)
   }
}
