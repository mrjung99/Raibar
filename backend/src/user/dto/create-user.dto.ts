import { IsEmail, IsNotEmpty, IsString, MaxLength, MIN_LENGTH, MinLength } from "class-validator"

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
}
