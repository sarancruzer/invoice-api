import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, LoggerService, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_SERVICE, IAuthService } from '../interface/auth.interface';
import { HttpExceptionFilter } from '../../shared/exception-filters/http-exception.filter';
import { CreateUserDto } from '../dto/auth-dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly iAuthService: IAuthService,
    ) {}

    // User register   
    @ApiBody({ type: CreateUserDto})
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<ResponseDto>{
      const res =  await this.iAuthService.register(createUserDto);
      return this.customResponse(res, "User Register successfully", HttpStatus.OK.toString());
    }
  

    // User authentication
    @ApiBody({ type: LoginUserDto})
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())    
    @Post('authenticate')
    async authenticate(@Body() loginUserDto: LoginUserDto): Promise<ResponseDto> {
        console.log("🚀 ~ file: auth.controller.ts ~ line 42 ~ AuthController ~ authenticate ~ loginUserDto", loginUserDto)
        const res =  await this.iAuthService.authenticate(loginUserDto);
        return this.customResponse(res, "Login successfully", HttpStatus.OK.toString());
    }   

    async customResponse(data: object, message: string, status: string) {
      const dto = new ResponseDto();
      dto.status = status;
      dto.message = message;
      dto.data = data;
      return dto;
    }

}

