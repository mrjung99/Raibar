

export abstract class HashingProvider {
   abstract hashPassword(password: string): Promise<string>

   abstract comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>
}