import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MIN_LENGTH, MinLength } from "class-validator"
import { Profile } from "src/profile/entities/profile.entity"

export class CreateUserDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(24)
   @MinLength(4)
   username: string

   @IsEmail()
   @IsNotEmpty()
   email: string

   @IsString()
   @IsNotEmpty()
   @MinLength(8)
   @MaxLength(100)
   password: string

   @IsOptional()
   profile: Profile
}
