import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { env } from 'src/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: env().jwt.secret,
            signOptions: { expiresIn: '30h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
