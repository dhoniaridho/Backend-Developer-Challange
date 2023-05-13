import { Module } from '@nestjs/common';
import { AppModule as AppBaseModule } from './app';
import { ConfigModule } from './config';
import { TransformInterceptor } from './common';

@Module({
    imports: [AppBaseModule, ConfigModule],
    providers: [
        {
            provide: 'APP_INTERCEPTOR',
            useClass: TransformInterceptor,
        },
    ],
})
export class AppModule {}
