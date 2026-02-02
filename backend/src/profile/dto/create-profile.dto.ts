import { IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class CreateProfileDto {
   @IsString()
   @IsOptional()
   @MinLength(4)
   @MaxLength(24)
   firstName?: string

   @IsString()
   @IsOptional()
   @MinLength(4)
   @MaxLength(24)
   lastName?: string

   @IsString()
   @IsOptional()
   gender?: string

   @IsString()
   @IsOptional()
   address?: string

   @IsString()
   @IsOptional()
   bio?: string

   @IsDate()
   @IsOptional()
   dateOfBirth?: Date

   @IsString()
   @IsOptional()
   profileImage?: string
}
