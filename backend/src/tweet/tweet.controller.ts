import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ActiveUsr } from 'src/auth/decorator/activeUser.decorator';

@Controller('tweet')
export class TweetController {
   constructor(private readonly tweetService: TweetService) { }

   //* ------------------ GET ALL TWEET ----------------------
   @Get()
   async getAllTweet() {
      const tweets = this.tweetService.getAllTweet()

      return { status: 'success', data: [tweets] }
   }


   //* ------------------ CREATE TWEET ----------------------
   @Post()
   async createTweet(@Body() createTweetDto: CreateTweetDto, @ActiveUsr('sub') userId: number) {
      await this.tweetService.createTweet(createTweetDto, userId)
      return {
         status: 'success',
         message: 'Tweet is posted successfully!!'
      }
   }


   //* ------------------ DELETE TWEET ----------------------
   @Delete(':id')
   async deleteTweet(@Param('id', ParseIntPipe) tweetId: number, @ActiveUsr('sub') userId: number) {
      await this.tweetService.deleteTweet(tweetId, userId)
      return {
         status: 'success',
         message: `Tweet with the id:${tweetId} has been deleted.`
      }
   }

}
