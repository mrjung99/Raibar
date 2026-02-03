import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TweetService {
   constructor(
      @InjectRepository(Tweet)
      private readonly tweetRepo: Repository<Tweet>,
      private readonly userService: UserService
   ) { }

   //* -----------------------  GET ALL TWEET ------------------
   async getAllTweet() {
      return await this.tweetRepo.find()
   }


   //* ------------------ CREATE TWEET ------------------------------
   async createTweet(createTweetDto: CreateTweetDto, userId: number) {
      const user = await this.userService.findUserById(userId)

      try {
         const tweet = this.tweetRepo.create({ ...createTweetDto, user })
         return await this.tweetRepo.save(tweet)

      } catch (error) {
         throw new BadRequestException(error)
      }
   }


   //* ------------------ DELETE TWEET ------------------------------
   async deleteTweet(tweetId: number, userId: number) {
      return await this.tweetRepo.findOne({
         where: {
            id: tweetId,
            user: { id: userId }
         }
      })
   }
}
