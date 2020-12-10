import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRolesService } from './user-roles.service';

@Module({
  providers: [UsersService, UsersRolesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
