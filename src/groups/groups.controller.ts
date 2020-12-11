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

  @Get(':groupId')
  async findOne(@Param('groupId', new ParseIntPipe()) id: number) {
    return this.groupsService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<GroupModel>) {
    return this.groupsService.create(props);
  }

  @Delete(':groupId')
  async delete(@Param('groupId', new ParseIntPipe()) id: number) {
    return this.groupsService.delete(id);
  }

  @Put(':groupId')
  async edit(
    @Param('groupId', new ParseIntPipe()) id: number,
    @Body() props: Partial<GroupModel>,
  ) {
    return this.groupsService.update(id, props);
  }

  @Get(':groupId/collections')
  async getCollections(@Param('groupId', new ParseIntPipe()) groupId: number) {
    return this.collectionService.findAllByGroup(groupId);
  }

  @Get(':groupId/collections/:collectionId')
  async getCollection(
    @Param('groupId', new ParseIntPipe()) groupId: number,
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.collectionService.findOneByGroup(collectionId, groupId);
  }

  @Post(':groupId/collections')
  async addCollection(
    @Param('groupId', new ParseIntPipe()) groupId: number,
    @Body() props: Partial<CollectionModel>,
  ) {
    return this.collectionService.create({ ...props, groupId });
  }

  @Put(':groupId/collections/:collectionId')
  async editCollection(
    @Param('id', new ParseIntPipe()) groupId: number,
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
    @Body() props: Partial<CollectionModel>,
  ) {
    return this.collectionService.update(collectionId, { ...props, groupId });
  }

  @Delete(':groupId/collections/:collectionId')
  async removeCollection(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.collectionService.delete(collectionId);
  }

  @Get(':groupId/collections/:collectionId/items')
  async getItems(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
  ) {
    return this.itemsService.findAllByCollection(collectionId);
  }

  @Get(':groupId/collections/:collectionId/items/:itemId')
  async getItem(
    @Param('collectionId', new ParseIntPipe()) collectionId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
  ) {
    return this.itemsService.findOneByCollection(itemId, collectionId);
  }

  @Post(':groupId/collections/:collectionId/items')
  async addItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Body() props: Partial<ItemModel>,
  ) {
    return this.itemsService.create({ ...props, parentId });
  }

  @Put(':groupId/collections/:collectionId/items/:itemId')
  async editItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
    @Body() props: Partial<ItemModel>,
  ) {
    return this.itemsService.updateInCollection(itemId, parentId, props);
  }

  @Delete(':groupId/collections/:collectionId/items/:itemId')
  async removeItem(
    @Param('collectionId', new ParseIntPipe()) parentId: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
  ) {
    return this.itemsService.deleteInCollection(itemId, parentId);
  }
}
