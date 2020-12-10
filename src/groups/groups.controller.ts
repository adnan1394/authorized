import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionModel } from 'src/database/models/collection.model';
import { GroupModel } from 'src/database/models/group.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { CollectionsService } from './collections.service';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseInterceptors(NotFoundInterceptor)
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private collectionService: CollectionsService,
  ) {}
  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.groupsService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<GroupModel>) {
    return this.groupsService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.groupsService.delete(id);
  }

  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<GroupModel>,
  ) {
    return this.groupsService.update(id, props);
  }

  @Get(':id/collections')
  async getCollections(@Param('id', new ParseIntPipe()) groupId: number) {
    return this.collectionService.findAllByGroup(groupId);
  }

  @Get(':id/collections/:collectionId')
  async getCollection(
    @Param('id', new ParseIntPipe()) groupId: number,
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.collectionService.findOneByGroup(collectionId, groupId);
  }

  @Post(':id/collections')
  async addCollection(
    @Param('id', new ParseIntPipe()) groupId: number,
    @Body() props: Partial<CollectionModel>,
  ) {
    return this.collectionService.create({ ...props, groupId });
  }

  @Put(':id/collections/:collectionId')
  async editCollection(
    @Param('id', new ParseIntPipe()) groupId: number,
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
    @Body() props: Partial<CollectionModel>,
  ) {
    return this.collectionService.update(collectionId, { ...props, groupId });
  }

  @Delete(':id/collections/:collectionId')
  async removeCollection(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.collectionService.delete(collectionId);
  }
}
