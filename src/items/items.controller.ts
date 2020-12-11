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
import { ItemModel } from 'src/database/models/item.model';
import { ItemsService } from 'src/items/items.service';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';

@Controller('items')
@UseInterceptors(NotFoundInterceptor)
@UseGuards(AdminGuard)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':itemId')
  async findOne(@Param('itemId', new ParseIntPipe()) id: number) {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<ItemModel>) {
    return this.itemsService.create(props);
  }

  @Delete(':itemId')
  async delete(@Param('itemId', new ParseIntPipe()) id: number) {
    return this.itemsService.delete(id);
  }

  @Put(':itemId')
  async edit(
    @Param('itemId', new ParseIntPipe()) id: number,
    @Body() props: Partial<ItemModel>,
  ) {
    return this.itemsService.update(id, props);
  }
}
