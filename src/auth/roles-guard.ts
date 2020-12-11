import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject('RolesService') private rolesService: RolesService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return this.validateRequest(context);
  }

  async validateRequest(execContext: ExecutionContext): Promise<boolean> {
    // TODO: Refactor to make it DRY
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
    const roleId = params.roleId;
    const role = roleId && (await this.rolesService.findOne(roleId));
    const groupId = (role && role.groupId) || body.groupId;
    const canManageRole = managerGroups.some((id) => id == groupId);
    const canReadRole =
      readOnlyGroups.some((id) => id == groupId) && method == 'GET';

    return isGlobalManager || canManageRole || canReadRole;
  }
}
