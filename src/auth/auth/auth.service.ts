import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto, TokenDto, UserTokenDto } from "../dto/login-user.dto";
import { plainToClass } from "class-transformer";
import { IAuthService } from "../interface/auth.interface";
import { SignupUserDto } from "../dto/auth-dto";
import { UserEntity } from "src/users/entities/user.entity";
import { RoleService } from "src/role/role.service";
import { JwtPayloadService } from "src/shared/services/jwt-payload.service";
import { generateCompanyInitialRole } from "src/seeders/initial-data";

@Injectable()
export class AuthService implements IAuthService {
    secret = '';
    expiresIn = '30m';
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private roleService: RoleService,
        private jwtPayloadService: JwtPayloadService
    ) {
        this.secret = 'JWT_SECRET';
        this.expiresIn = '30m';
     }

    async register(signupUserDto: SignupUserDto): Promise<UserEntity> {
        console.log("🚀 ~ file: auth.service.ts ~ line 29 ~ AuthService ~ register ~ signupUserDto", signupUserDto)
        const errors = await validate(signupUserDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
        const { email, password } = signupUserDto;
        const isExistUser = await this.userRepository.findOneBy({ email: email });
        if (isExistUser) {
            throw new HttpException("Your email already exists!", HttpStatus.BAD_REQUEST);
        } 
        signupUserDto.password = bcrypt.hashSync(password, 10);
        const user: UserEntity = this.userRepository.create(signupUserDto); 
        const role = await this.roleService.findRoleByName(generateCompanyInitialRole().name);
        user.role = role;
        const newUser = await this.userRepository.save(user);     
        return newUser;
    }   


    async authenticate(loginUserDto: LoginUserDto): Promise<TokenDto> {                 
        const errors = await validate(loginUserDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException( errors , HttpStatus.BAD_REQUEST);
        }
        const { email } = loginUserDto;
        const user = await this.userRepository.findOneBy({ email });
        const error =  { message: loginUserDto.email + ' User not found' } ;
        if (!user) throw new HttpException( {errors: error }, HttpStatus.UNAUTHORIZED);

        if (bcrypt.compareSync(loginUserDto.password, user.password)) {
            const userData = plainToClass(UserTokenDto, user);
            const tokenData:TokenDto = await this.jwtPayloadService.createJwtPayload(userData).then(res => res);
            return tokenData
        }
        throw new HttpException({errors: { message: 'Password is wrongg!' }}, HttpStatus.UNAUTHORIZED);
    }  

    async findOne(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOneBy({email : username });
    } 
    
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.findOne(username);
        if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }

}
