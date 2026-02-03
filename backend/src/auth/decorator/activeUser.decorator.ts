import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserType } from "../interface/activeUserType.interface";
import { Request } from "express";


export const ActiveUsr = createParamDecorator(
   (field: keyof ActiveUserType, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      return field ? user?.[field] : user
   })