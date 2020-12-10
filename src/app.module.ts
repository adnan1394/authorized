import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, RolesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
