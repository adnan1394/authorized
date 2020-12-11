import { Module } from '@nestjs/common';
import { CollectionsService } from 'src/groups/collections.service';
import { ItemsService } from 'src/items/items.service';
import { CollectionsController } from './collections.controller';

@Module({
  providers: [CollectionsService, ItemsService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
