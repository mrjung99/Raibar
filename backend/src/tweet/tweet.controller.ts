import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   ParseIntPipe,
   Request,
   BadRequestException,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ActiveUsr } from 'src/auth/decorator/activeUser.decorator';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { AllowAccess } from 'src/auth/decorator/allowAccess.decorator';

@Controller('tweet')
export class TweetController {
   constructor(private readonly tweetService: TweetService) { }

   //* ------------------ GET ALL TWEET ----------------------
   @Get()
   @AllowAccess()
   async getAllTweet() {
      const tweets = await this.tweetService.getAllTweet();
      if (!tweets) {
         return { status: 'fail', message: 'No tweets to show!!' };
      }

      return { status: 'success', data: tweets };
   }

   //* ------------------ GET ALL TWEET OF USER----------------------
   @Get('me')
   async getAllTweetOf(@Request() req: any) {
      const tweets = await this.tweetService.findTweetOf(req.user.userId);

      return { status: 'success', data: tweets };
   }

   //* ------------------ CREATE TWEET ----------------------
   @Post()
   async createTweet(
      @Body() createTweetDto: CreateTweetDto,
      @ActiveUsr('sub') userId: number,
   ) {
      await this.tweetService.createTweet(createTweetDto, userId);
      return {
         status: 'success',
         message: 'Tweet is posted successfully!!',
      };
   }

   //* ------------------ UPDATE TWEET ----------------------
   @Patch(':id')
   async updateTweet(
      @Param('id', ParseIntPipe) tweetId: number,
      @Body() updateTweetDto: UpdateTweetDto,
      @ActiveUsr('sub') userId: number,
   ) {
      await this.tweetService.updateTweet(tweetId, updateTweetDto, userId);
      return { status: 'success', message: 'Tweet updated successfully.' };
   }

   //* ------------------ DELETE TWEET ----------------------
   @Delete(':id')
   async deleteTweet(
      @Param('id', ParseIntPipe) tweetId: number,
      @ActiveUsr('sub') userId: number,
   ) {
      const isDeleted = await this.tweetService.deleteTweet(tweetId, userId);
      if (!isDeleted) {
         throw new BadRequestException();
      }

      return {
         status: 'success',
         message: `Tweet with the id:${tweetId} has been deleted.`,
      };
   }
}
