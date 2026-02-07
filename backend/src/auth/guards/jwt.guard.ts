import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ISPUBLIC_FIELD_KEY } from '../decorator/allowAccess.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   constructor(private readonly reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic = this.reflector.getAllAndOverride(ISPUBLIC_FIELD_KEY, [
         context.getClass(),
         context.getHandler(),
      ]);

      if (isPublic) {
         return true;
      }

      return super.canActivate(context);
   }
}
