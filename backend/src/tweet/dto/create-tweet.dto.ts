import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto {
   @IsString()
   @IsNotEmpty()
   text: string

   @IsOptional()
   postImage?: string
}
