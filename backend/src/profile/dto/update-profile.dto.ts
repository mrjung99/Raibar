import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
   @IsInt()
   @IsNotEmpty()
   userId: number
}
