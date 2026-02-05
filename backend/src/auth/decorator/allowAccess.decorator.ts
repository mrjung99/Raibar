import { SetMetadata } from '@nestjs/common';

export const ISPUBLIC_FIELD_KEY = 'isPUblic';

export const AllowAccess = () => {
  return SetMetadata(ISPUBLIC_FIELD_KEY, true);
};
