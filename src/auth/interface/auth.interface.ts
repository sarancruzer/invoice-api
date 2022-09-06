import { ResponseDto } from "src/shared/dto/response.dto";
import { CreateUserDto, UserForgotPasswordDto } from "../dto/auth-dto";
import { LoginUserDto, UserTokenDto } from "../dto/login-user.dto";
export const AUTH_SERVICE = 'AUTH SERVICE';

export interface IAuthService {

    register(createUserDto: CreateUserDto): Promise<any>;

    authenticate(loginUserDto: LoginUserDto): Promise<UserTokenDto>;

    validateUser(username: string, pass: string): Promise<any>;

    customResponse(data: object, message: string, status: string, roleModules?: any): Promise<ResponseDto>;

    findOne(id): Promise<any>;

}