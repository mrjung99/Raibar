import { SetMetadata } from "@nestjs/common"


export const AllowAccess = () => {
   return SetMetadata('isPublic', true)
}