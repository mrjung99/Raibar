import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTweetDto {
   @IsString()
   @IsNotEmpty()
   text: string
}
