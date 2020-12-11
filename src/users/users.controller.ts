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
import { UserModel } from 'src/database/models/user.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(NotFoundInterceptor)
@UseGuards(AdminGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<UserModel>) {
    return this.usersService.create(props);
  }

  @Delete(':userId')
  async delete(@Param('userId', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }

  @Put(':userId')
  async edit(
    @Param('userId', new ParseIntPipe()) id: number,
    @Body('email') email: string,
  ) {
    return this.usersService.update(id, { email });
  }

  @Put(':userId/roles/:roleId')
  async addRole(
    @Param('userId', new ParseIntPipe()) id: number,
    @Param('roleId', new ParseIntPipe()) roleId: number,
  ) {
    return this.usersService.addRole(id, roleId);
  }

  @Delete(':userId/roles/:roleId')
  async removeRole(
    @Param('userId', new ParseIntPipe()) id: number,
    @Param('roleId', new ParseIntPipe()) roleId: number,
  ) {
    return this.usersService.removeRole(id, roleId);
  }
}
