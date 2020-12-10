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
import { ItemModel } from 'src/database/models/item.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { CollectionsService } from './collections.service';
import { GroupsService } from './groups.service';
import { ItemsService } from './items.service';

@Controller('groups')
@UseInterceptors(NotFoundInterceptor)
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private collectionService: CollectionsService,
    private itemsService: ItemsService,
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

  @Get(':id/collections/:collectionId/items')
  async getItems(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.itemsService.findAllByCollection(collectionId);
  }

  @Get(':id/collections/:collectionId/items/:itemId')
  async getItem(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
  ) {
    return this.itemsService.findOneByCollection(itemId, collectionId);
  }

  @Post(':id/collections/:collectionId/items')
  async addItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Body() props: Partial<ItemModel>,
  ) {
    return this.itemsService.create({ ...props, parentId });
  }

  @Put(':id/collections/:collectionId/items/:itemId')
  async editItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
    @Body() props: Partial<ItemModel>,
  ) {
    return this.itemsService.updateInCollection(itemId, parentId, props);
  }

  @Delete(':id/collections/:collectionId/items/:itemId')
  async removeItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
  ) {
    return this.itemsService.deleteInCollection(itemId, parentId);
  }
}
