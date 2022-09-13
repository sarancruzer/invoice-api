import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm'
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcrypt'
import { RoleEntity } from 'src/role/entities/role.entity';
import { CommonService } from 'src/shared/services/common.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private roleService: RoleService,
    private commonService: CommonService

  ) {}
  
  async createAdmin(createAdminUserDto: CreateAdminDto) {
    const user = await this.userRepository.findOne({
      where: { email: createAdminUserDto.email },
    });
    if (user) return user;
    const role = await this.roleService.findOne(+createAdminUserDto.roleId);
    return await this.saveUser(createAdminUserDto, role);
  }

  private async saveUser(createAdminUserDto: CreateAdminDto, role: RoleEntity) {
    const user = await this.findOneByEmail(createAdminUserDto.email)
    if (!user) {
      const hashedPassword = await bcrypt.hash(createAdminUserDto.password, 5)
      createAdminUserDto.password = hashedPassword;
      const createAdminUserData = <CreateAdminDto>this.commonService.cleanUpObjectKeys(createAdminUserDto);
      const adminUser = this.userRepository.create(createAdminUserData)
      adminUser.role = role;
      return await this.userRepository.save(adminUser)
    }
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email,
        status: 1,
      },
      relations: ['role'],
    })
  }

}
