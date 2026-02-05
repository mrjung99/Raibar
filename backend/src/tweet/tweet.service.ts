import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    private readonly userService: UserService,
  ) {}

  //* -----------------------  GET ALL TWEET ------------------
  async getAllTweet() {
    const tweets = await this.tweetRepo.find();
    if (!tweets) {
      return false;
    }
    return tweets;
  }

  //* -----------------------  GET ALL TWEET OF ACTIVE USER ------------------
  async findTweetOf(userId: number) {
    if (!userId) throw new UnauthorizedException('User is not authenticated!!');
    const tweets = await this.tweetRepo.find({
      where: {
        user: { id: userId },
      },
    });

    if (!tweets) {
      return null;
    }

    return tweets;
  }

  //* -----------------------  GET SPECIFIC TWEET  ------------------
  async getSpecificTweet(tweetId: number, userId: number) {
    const tweet = await this.tweetRepo.findOne({
      where: {
        id: tweetId,
        user: { id: userId },
      },
    });

    if (!tweet) {
      throw new NotFoundException(`Tweet with the id:${tweetId} not found!!`);
    }

    return tweet;
  }

  //* ------------------ CREATE TWEET ------------------------------
  async createTweet(createTweetDto: CreateTweetDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    try {
      const tweet = this.tweetRepo.create({ ...createTweetDto, user });
      return await this.tweetRepo.save(tweet);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //* ------------------ UPDATE TWEET ------------------------------
  async updateTweet(
    tweetId: number,
    updateTweetDto: UpdateTweetDto,
    userId: number,
  ) {
    const tweet = await this.getSpecificTweet(tweetId, userId);

    if (updateTweetDto.postImage !== undefined) {
      tweet.postImage = updateTweetDto.postImage;
    }

    if (updateTweetDto.text !== undefined) {
      tweet.text = updateTweetDto.text;
    }

    const tweetToUpdate = this.tweetRepo.create(tweet);
    return await this.tweetRepo.save(tweetToUpdate);
  }

  //* ------------------ DELETE TWEET ------------------------------
  async deleteTweet(tweetId: number, userId: number) {
    const tweet = await this.tweetRepo.findOne({
      where: {
        id: tweetId,
        user: { id: userId },
      },
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found!!');
    }

    await this.tweetRepo.remove(tweet);

    return true;
  }
}
