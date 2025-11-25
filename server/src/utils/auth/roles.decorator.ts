import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/user.dtos';

export const Role = (role: UserRole) => SetMetadata('role', role);
