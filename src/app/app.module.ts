import { Global, Module } from '@nestjs/common';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { ConfigModule } from 'src/config';

@Global()
@Module({
    imports: [UserModule, AuthModule, ConfigModule],
    exports: [ConfigModule],
})
export class AppModule {}
