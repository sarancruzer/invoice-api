
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

export class CreateUserDto {}

export class CreateAdminDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobile: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty()
  @IsNumber()
  roleId: number

  @ApiProperty()
  @IsNumber()
  status: number
}
