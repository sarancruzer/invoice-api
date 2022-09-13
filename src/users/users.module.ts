import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { CommonService } from 'src/shared/services/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CommonService],
  exports: [UsersService]
})
export class UsersModule {}
