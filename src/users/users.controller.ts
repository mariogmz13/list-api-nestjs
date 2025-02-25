import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {


    constructor(private readonly usersService: UsersService) {}
    
        @Post()
        async create(@Body() createUserDto: CreateUserDto) {
            console.log(createUserDto);
    
            const user: CreateUserDto = {
                username: createUserDto.username,
                email: createUserDto.email,
                password: createUserDto.password,
                updated_at: new Date(),
                created_at: new Date(),
            }
    
            await this.usersService.create(user)
            return {
                ok: true,
                message: 'Usuario Creado Correctamente'
            } 
        }
    
        @Get()
        async getAll() {
            return this.usersService.getAll()
        }
    
        @Get(':id')
        async getByID(@Param('id') id: string) {
            return this.usersService.getById(id)
        }
    
        @Put(':id')
        async update(@Param('id') id : string, @Body() updateUserDto: UpdateUserDto) {
    
            const user: UpdateUserDto = {
                
                username: updateUserDto.username,
                email: updateUserDto.email,
                password: updateUserDto.password,
                updated_at: new Date(),
                created_at: updateUserDto.created_at
            }
    
            await this.usersService.update(id, user)
            return {
                ok: true,
                message: 'Usuario Modificado Correctamente'
            } 
    
            // return this.usersService.update(id, updateActivityDto)
        }
    
        @Delete(':id')
        async delete(@Param('id') id: string) {
    
            await this.usersService.delete(id)
            return {
                ok: true,
                message: 'Usuario Eliminado Correctamente'
            } 
        }

}
