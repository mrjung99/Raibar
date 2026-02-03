import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import authConfig from "../config/authConfig";
import { Request } from "express";
import { Reflector } from "@nestjs/core";


const REQUEST_FIELD_KEY = 'user'

export class AuthorizedGuard implements CanActivate {
   constructor(
      private readonly jwtService: JwtService,
      @Inject(authConfig.KEY)
      private readonly authConfiguration: ConfigType<typeof authConfig>,
      private readonly reflector: Reflector
   ) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride('isPublic', [
         context.getClass(),
         context.getHandler()
      ])

      if (isPublic) {
         return true
      }

      const request: Request = context.switchToHttp().getRequest()
      const token = request.headers.authorization?.split(' ')[1]

      if (!token) {
         throw new UnauthorizedException()
      }

      try {
         const payload = await this.jwtService.verifyAsync(token, this.authConfiguration)

         request[REQUEST_FIELD_KEY] = payload
      } catch (error) {
         throw new UnauthorizedException(error)
      }

      return true
   }
}