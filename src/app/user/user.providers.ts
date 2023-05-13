import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { USER_REPOSITORY, User } from './entities';
import { DATABASE_CONSTANT } from 'src/config';

export const userProviders: Provider[] = [
    {
        provide: USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATABASE_CONSTANT.DATA_SOURCE],
    },
];
