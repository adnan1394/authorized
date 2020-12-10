import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { CollectionsService } from './collections.service';
import { ItemsService } from './items.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersRolesService } from 'src/users/user-roles.service';

@Module({
  providers: [
    GroupsService,
    CollectionsService,
    ItemsService,
    RolesService,
    UsersRolesService,
  ],
  controllers: [GroupsController],
})
export class GroupsModule {}
