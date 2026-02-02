import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTweetDto {
   @IsInt()
   @IsNotEmpty()
   userId: number

   @IsString()
   @IsNotEmpty()
   text: string
}
