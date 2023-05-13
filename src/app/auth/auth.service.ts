import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user';
import { LoginDto, RegisterDto } from './dto';
import { comparePassword } from 'src/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.getOneByEmail(loginDto.email);

        if (!user) {
            throw new HttpException(
                'your account not found!. Please provide valid data',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const isMatch = comparePassword(loginDto.password, user.password);

        if (!isMatch) {
            throw new HttpException(
                'password not match',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const token = await this.jwtService.signAsync({
            id: user.id,
        });

        delete user.password;

        return {
            data: {
                user,
                token,
            },
        };
    }

    async register(registerDto: RegisterDto) {
        const { data: user } = await this.userService.createOne(registerDto);
        try {
            delete user.password;

            return {
                data: user,
            };
        } catch (error) {
            Logger.error(error.message, 'AUTH');
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getProfile(id: string) {
        try {
            const { data: user } = await this.userService.getOne(id);

            if (!user)
                throw new HttpException(
                    'not authorized',
                    HttpStatus.UNAUTHORIZED,
                );

            delete user?.password;

            return {
                data: user,
            };
        } catch (error) {
            Logger.error(error.message, 'AUTH');
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
