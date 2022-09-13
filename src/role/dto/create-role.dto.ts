import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty()
  @MinLength(3)
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @MinLength(3)
  permissions: string
}
