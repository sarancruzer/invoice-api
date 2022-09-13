import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, UseInterceptors } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_SERVICE, IAuthService } from '../interface/auth.interface';
import { HttpExceptionFilter } from '../../shared/exception-filters/http-exception.filter';
import { SignupUserDto } from '../dto/auth-dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

@UseInterceptors(TransformInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
   
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly iAuthService: IAuthService,
    ) {}

    // User register   
    @ApiBody({ type: SignupUserDto})
    @Post('register')
    async userRegister(@Body() signupUserDto: SignupUserDto): Promise<ResponseDto>{
      const res =  await this.iAuthService.register(signupUserDto);
      return this.customResponse(res, "User Register successfully", HttpStatus.OK.toString());
    }
  

    // User authentication
    @ApiBody({ type: LoginUserDto})
    @UseFilters(new HttpExceptionFilter())
    @Post('authenticate')
    async authenticate(@Body() loginUserDto: LoginUserDto): Promise<any> {
        console.log("🚀 ~ file: auth.controller.ts ~ line 42 ~ AuthController ~ authenticate ~ loginUserDto", loginUserDto)
        const res =  await this.iAuthService.authenticate(loginUserDto);
        console.log("🚀 ~ file: auth.controller.ts ~ line 35 ~ AuthController ~ authenticate ~ res", res)
        return {message: "Login successss", result: res};
    }   

    async customResponse(data: object, message: string, status: string) {
      const dto = new ResponseDto();
      dto.status = status;
      dto.message = message;
      dto.data = data;
      return dto;
    }

}

