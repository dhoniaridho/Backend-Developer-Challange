import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsString()
    username: string;
}
