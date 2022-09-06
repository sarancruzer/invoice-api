import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto, UserTokenDto } from "../dto/login-user.dto";
import { plainToClass } from "class-transformer";
import { IAuthService } from "../interface/auth.interface";
import { ResponseDto } from "../../shared/dto/response.dto";
import { CreateUserDto } from "../dto/auth-dto";
import { Users } from "../entities/users.entity";

@Injectable()
export class AuthService implements IAuthService {
    secret = '';
    expiresIn = '30m';
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {
        this.secret = 'JWT_SECRET';
        this.expiresIn = '30m';
     }

    // To register public users and send welcome mail service
    async register(createUserDto: CreateUserDto): Promise<any> {

        const errors = await validate(createUserDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        const { email } = createUserDto;
        const isExistUser = await this.userRepository.findOneBy({ email });
        if (isExistUser) {
            throw new HttpException("Your email already exists!", HttpStatus.BAD_REQUEST);
        } 
        let newUser = new Users();
        const newUserValue = Object.assign(newUser, createUserDto);
        
        const user = await this.userRepository.save(newUserValue);     

        const token =  await this.generateAccessToken(user);

        return user;
       

    }   


    async authenticate(loginUserDto: LoginUserDto): Promise<UserTokenDto> { 
                
        const errors = await validate(loginUserDto);  // Validate Fileds
        if (errors.length > 0) {

            throw new HttpException( errors , HttpStatus.BAD_REQUEST);
        }
        const { email } = loginUserDto;
        const user = await this.userRepository.findOneBy({ email });
        console.log("🚀 ~ file: auth.service.ts ~ line 89 ~ AuthService ~ authenticate ~ user", user)
        const error =  loginUserDto.email + ' User not found' ;
        if (!user) throw new HttpException( error, HttpStatus.UNAUTHORIZED);        


        if (bcrypt.compareSync(loginUserDto.password, user.password)) {
            const userData = plainToClass(UserTokenDto, user);

            return userData;
        }
        const _errors = { email: 'Password is wrong!.' };
        throw new HttpException({ message: 'Password is wrong!', _errors }, HttpStatus.UNAUTHORIZED);
    }  

    async findOne(username: string): Promise<Users | undefined> {
        return this.userRepository.findOneBy({email : username });
    }
    

    
    // To send the token for verify email address
    async generateAccessToken(data: any): Promise<any> {

        let token = this.jwtService.sign(data);
        const tokenData = {
            token: token 
        };
        return tokenData;
    }   


    async customResponse(data: object, message: string, status: string, roleModules?: any): Promise<ResponseDto> {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        if(data) {
            dto.token = this.generateJWT(data);
        }

        return dto;
    }

    public generateJWT(data: any) {
        return this.jwtService.sign({data}, {
                expiresIn: this.expiresIn,
                secret: this.secret
            });
    };

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.findOne(username);
        if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }

}
