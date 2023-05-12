import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { USER_REPOSITORY, User } from './entities';
import { IsNull, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/common';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: Repository<User>,
    ) {}

    async getAll() {
        return this.userRepository.find({
            where: {
                deleted_at: IsNull(),
            },
        });
    }

    async createOne(createUserDto: CreateUserDto) {
        try {
            const users = await this.userRepository.find({
                where: {
                    email: createUserDto.email,
                },
            });

            if (users.length != 0)
                throw new HttpException(
                    'email already taken',
                    HttpStatus.BAD_REQUEST,
                );

            const user = new User({
                email: createUserDto.email,
                name: createUserDto.name,
                username: createUserDto.username,
                password: createUserDto.password,
            });

            await this.userRepository.save(user);

            return {
                data: user,
            };
        } catch (error) {
            Logger.error(error.message, 'USER');
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getOne(id: string) {
        try {
            const data = await this.userRepository.findOne({
                where: {
                    id,
                    deleted_at: IsNull(),
                },
            });

            return {
                data,
            };
        } catch (error) {
            Logger.error(error, 'USER');
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async getOneByEmail(email: string) {
        try {
            const data = await this.userRepository.findOne({
                where: {
                    email,
                    deleted_at: IsNull(),
                },
            });

            return data;
        } catch (error) {
            Logger.error(error, 'USER');
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async updateOne(id: string, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    id,
                },
            });

            const updateData = {
                ...updateUserDto,
            };

            if (updateUserDto.password) {
                updateData.password = await hashPassword(
                    updateUserDto.password,
                );
            }

            const data = await this.userRepository.save({
                ...user,
                ...updateData,
            });

            return {
                user: data,
            };
        } catch (error) {
            Logger.error(error, 'USER');
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteOne(id: string) {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    id,
                },
            });

            await this.userRepository.save({
                ...user,
                deleted_at: new Date(),
            });

            return {
                user,
            };
        } catch (error) {
            Logger.error(error, 'USER');
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}
