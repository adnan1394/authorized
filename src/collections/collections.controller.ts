import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin-guard';
import { CollectionModel } from 'src/database/models/collection.model';
import { CollectionsService } from 'src/groups/collections.service';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';

@Controller('collections')
@UseInterceptors(NotFoundInterceptor)
@UseGuards(AdminGuard)
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}
  @Get()
  async findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':collectionId')
  async findOne(@Param('collectionId', new ParseIntPipe()) id: number) {
    return this.collectionsService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<CollectionModel>) {
    return this.collectionsService.create(props);
  }

  @Delete(':collectionId')
  async delete(@Param('collectionId', new ParseIntPipe()) id: number) {
    return this.collectionsService.delete(id);
  }

  @Put(':collectionId')
  async edit(
    @Param('collectionId', new ParseIntPipe()) id: number,
    @Body() props: Partial<CollectionModel>,
  ) {
    return this.collectionsService.update(id, props);
  }
}
