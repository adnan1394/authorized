import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersRolesService } from 'src/users/user-roles.service';

@Module({
  providers: [RolesService, UsersRolesService],
  controllers: [RolesController],
})
export class RolesModule {}
