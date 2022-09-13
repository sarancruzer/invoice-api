import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private repo: Repository<RoleEntity>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  async findOne(id: number) {
    const role = await this.repo.findOne({
      where: { id: id }
    });

    if (!role) throw new NotFoundException('Role not found')
    return role
  }

  async findRoleByName(name: string) {
    const role = await this.repo.findOne({
      where: { name: name }
    });

    if (!role) throw new NotFoundException('Role not found')
    return role
  }

  async createForSeed(createRoleDto: CreateRoleDto) {
    const role = await this.repo.findOne({
      where: { name: createRoleDto.name },
    })
    if (role) return role
    const newRole = this.repo.create(createRoleDto)
    return await this.repo.save(newRole)
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
