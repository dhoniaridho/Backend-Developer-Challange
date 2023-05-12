import { Module } from '@nestjs/common';
import { AppModule as AppBaseModule } from './app';
import { ConfigModule } from './config';

@Module({
    imports: [AppBaseModule, ConfigModule],
})
export class AppModule {}
