import { PartialType } from '@nestjs/mapped-types';
import { CreateTweetDto } from './create-tweet.dto';
import { IsInt, isInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTweetDto {
   @IsString()
   @IsNotEmpty()
   text: string;

   @IsOptional()
   postImage?: string

   @IsInt()
   @IsNotEmpty()
   tweetId: number
}
