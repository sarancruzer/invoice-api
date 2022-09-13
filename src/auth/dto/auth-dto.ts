import { IsEmail, IsNotEmpty } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";


export class SignupUserDto {

    @ApiProperty()
    @IsNotEmpty()   
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    mobile: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;   
}


export class UpdateUserDto extends PartialType(SignupUserDto) {}


