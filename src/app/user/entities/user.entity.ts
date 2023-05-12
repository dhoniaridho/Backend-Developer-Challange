import { hashPassword } from 'src/common';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    constructor(payload?: Partial<User>) {
        this.email = payload?.email;
        this.name = payload?.name;
        this.username = payload?.username;
        this.password = payload?.password;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column('timestamptz', {
        nullable: true,
    })
    deleted_at?: Date;

    @BeforeUpdate()
    @BeforeInsert()
    async setPassword() {
        const password = await hashPassword(this?.password);
        this.password = password;
    }
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
