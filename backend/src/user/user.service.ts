import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingProvider } from 'src/auth/provider/hashing.provider';


@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,

      private readonly hashingProvider: HashingProvider
   ) { }



   //* ------------------ CREATE USER -------------------------
   async createUser(createUserDto: CreateUserDto) {
      createUserDto.profile = createUserDto.profile ?? {}

      try {
         const user = this.userRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
         })

         return await this.userRepository.save(user)

      } catch (error) {
         if (error.code === '23505') {
            if (error.detail.includes('username')) {
               throw new BadRequestException({
                  status: 'fail',
                  field: 'username',
                  message: "username already taken!!"
               })
            }

            if (error.detail.includes('email')) {
               throw new BadRequestException({
                  status: 'fail',
                  field: "email",
                  message: "User with this email already exist, try another one!!"
               })
            }

         }
      }
   }



   //* ------------------ FIND USER BY EMAIL -------------------------
   async findUserByEmail(email: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { email } })

      if (!user) {
         throw new NotFoundException(`User with the email: ${email} is not found.`)
      }

      return user
   }



   //* ------------------ FIND USER BY EMAIL -------------------------
   async findUserById(userId: number) {
      const user = await this.userRepository.findOneBy({ id: userId })

      if (!user) {
         throw new NotFoundException("User not found!!")
      }

      return user
   }

}
