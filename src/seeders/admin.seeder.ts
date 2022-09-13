import { INestApplication } from '@nestjs/common'
import { RoleService } from 'src/role/role.service'
import { UsersService } from 'src/users/users.service'
import { generateSuperAdminInitialRole, generateCompanyInitialRole, generateInitialSuperAdmin } from './initial-data'

export const launchSuperUserSeeder = async (app: INestApplication) => {
  const usersService = app.get(UsersService)
  const roleService = app.get(RoleService)
  const adminRole = await roleService.createForSeed(generateSuperAdminInitialRole())
  const customerRole = await roleService.createForSeed(generateCompanyInitialRole())
  await usersService.createAdmin(generateInitialSuperAdmin(adminRole?.id))
}
