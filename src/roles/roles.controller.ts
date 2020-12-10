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
import { RoleModel } from 'src/database/models/role.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { RolesService } from './roles.service';

@Controller('roles')
@UseInterceptors(NotFoundInterceptor)
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<RoleModel>) {
    return this.rolesService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.delete(id);
  }

  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<RoleModel>,
  ) {
    return this.rolesService.update(id, props);
  }
}
