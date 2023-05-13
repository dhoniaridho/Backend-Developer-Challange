import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    await app.listen(env().port);

    Logger.log(
        `Nest application running at port ${env().port}`,
        'NestApplication',
    );
}
bootstrap();
