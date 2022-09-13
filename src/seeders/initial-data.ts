export const generateInitialSuperAdmin = (roleId: number) => {
  return {
    name: 'Super Admin',
    email: process.env.SUPER_ADMIN_EMAIL,
    mobile: process.env.SUPER_ADMIN_PHONE,
    password: process.env.SUPER_ADMIN_PASSWORD,
    roleId,
    status: 1,
  }
}

export const generateSuperAdminInitialRole = () => {
  return {
    name: 'Super Admin',
    description: 'Super Admin Role',
    permissions: 'ALL',
  }
}
export const generateCompanyInitialRole = () => {
  return {
    name: 'Company',
    description: 'Company Role',
    permissions: 'ALL',
  }
}

