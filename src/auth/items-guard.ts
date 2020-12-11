import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class ItemsGuard implements CanActivate {
  constructor(@Inject('ItemsService') private itemsService: ItemsService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return this.validateRequest(context);
  }

  async validateRequest(execContext: ExecutionContext): Promise<boolean> {
    const request = execContext.switchToHttp().getRequest();
    const { user, method, params, body } = request;
    const { roles } = user;
    const isGlobalManager = roles.some((elem) => elem.role == 'globalManager');
    const managerGroups = roles
      .filter((role) => role.role == 'manager')
      .map((role) => role.groupId);
    const readOnlyGroups = roles
      .filter((role) => role.role == 'regular')
      .map((role) => role.groupId);
    //  Validate
    const itemId = params.itemId;
    const item =
      itemId && (await this.itemsService.findOne(itemId).eager('[collection]'));
    const collection = item && item.collection;
    const { groupId } = params;
    const canManageCollection = managerGroups.some((id) => id == groupId);
    const canReadCollection =
      readOnlyGroups.some((id) => id == groupId) && method == 'GET';
    const validGroup =
      isGlobalManager || canManageCollection || canReadCollection;
    const itemDoesNotBelongToGroup =
      validGroup &&
      (!collection ||
        collection.id != params.collectionId ||
        collection.groupId != params.groupId);

    if (itemDoesNotBelongToGroup) {
      throw new NotFoundException();
    }
    return validGroup;
  }
}
