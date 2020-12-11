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
import { RolesGuard } from 'src/auth/roles-guard';
import { RoleModel } from 'src/database/models/role.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(RolesGuard)
@UseInterceptors(NotFoundInterceptor)
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':roleId')
  async findOne(@Param('roleId', new ParseIntPipe()) id: number) {
    return this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<RoleModel>) {
    return this.rolesService.create(props);
  }

  @Delete(':roleId')
  async delete(@Param('roleId', new ParseIntPipe()) id: number) {
    return this.rolesService.delete(id);
  }

  @Put(':roleId')
  async edit(
    @Param('roleId', new ParseIntPipe()) id: number,
    @Body() props: Partial<RoleModel>,
  ) {
    return this.rolesService.update(id, props);
  }
}
