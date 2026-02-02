import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements HashingProvider {
   private readonly saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '12')
   async hashPassword(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRound)
   }

   async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(plainPassword, hashedPassword)
   }
}