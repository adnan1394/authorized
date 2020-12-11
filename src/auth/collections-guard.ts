import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CollectionsService } from 'src/groups/collections.service';

@Injectable()
export class CollectionsGuard implements CanActivate {
  constructor(
    @Inject('CollectionsService') private collectionService: CollectionsService,
  ) {}
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
    const collectionId = params.collectionId;
    const collection =
      collectionId && (await this.collectionService.findOne(collectionId));
    const { groupId } = params;
    const canManageCollection = managerGroups.some((id) => id == groupId);
    const canReadCollection =
      readOnlyGroups.some((id) => id == groupId) && method == 'GET';
    const validGroup =
      isGlobalManager || canManageCollection || canReadCollection;
    const collectionDoesNotBelongToGroup =
      validGroup &&
      collectionId &&
      collection &&
      collection.groupId != params.groupId;

    if (collectionDoesNotBelongToGroup) {
      throw new NotFoundException();
    }

    return validGroup;
  }
}
