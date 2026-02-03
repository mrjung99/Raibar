import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
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
      if (updateProfileDto.firstName !== undefined) {
         profile.firstName = updateProfileDto.firstName
      }

      if (updateProfileDto.lastName !== undefined) {
         profile.lastName = updateProfileDto.lastName
      }

      if (updateProfileDto.address !== undefined) {
         profile.address = updateProfileDto.address
      }

      if (updateProfileDto.bio !== undefined) {
         profile.bio = updateProfileDto.bio
      }

      if (updateProfileDto.dateOfBirth !== undefined) {
         profile.dateOfBirth = updateProfileDto.dateOfBirth
      }

      if (updateProfileDto.gender !== undefined) {
         profile.gender = updateProfileDto.gender
      }

      if (updateProfileDto.profileImage !== undefined) {
         profile.profileImage = updateProfileDto.profileImage
      }

      const profileToUpdate = this.profileRepo.create(profile)
      return await this.profileRepo.save(profileToUpdate)
   }
}
