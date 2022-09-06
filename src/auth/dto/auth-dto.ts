import { IsEmail, IsNotEmpty } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';


export class UserRegisterDto {

    
    @IsNotEmpty()
    firstName: string;

    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    mobileNumber: string;
    
    role: string;

}

export class CompanyRegisterDto {

    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    companyName: string;

    mobileNumber: string;
}

export class TokenVerifyDto {

    @IsNotEmpty()
    token: string;

    email: string; 
}

// Request DTO
export class UserForgotPasswordDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}


export class CreateUserDto {

    @IsNotEmpty()   
    firstName: string;


    @IsNotEmpty()    
    lastName: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    mobileNumber: string;


    @IsNotEmpty()
    password: string;   
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}


