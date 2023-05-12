import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    getAll() {
        return this.userService.getAll();
    }

    @Post('/')
    createOne(@Body() createUserDto: CreateUserDto) {
        return this.userService.createOne(createUserDto);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.userService.getOne(id);
    }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateOne(id, updateUserDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.userService.deleteOne(id);
    }
}
