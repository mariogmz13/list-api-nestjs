import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { HashService } from './hash.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
        private readonly hashService: HashService,
        private readonly usersService: UsersService
    ) { }


    @Post('login')
    async login(@Body() login: LoginUserDto) {
        try {
            const token = await this.authService.validateUser(login.email, login.password)
            return {
                ok: true,
                message: "Usuario validado correctamente",
                token: token
            };
        } catch (error) {
            return {
                ok: false,
                message: error.message
            }
        }

    }

    @Post('register')
    async create(@Body() registerUserDto: RegisterUserDto) {
        console.log(registerUserDto);

        try {
            if (await this.usersService.checkEmail(registerUserDto.email)) {
                return {
                    ok: false,
                    message: 'El email ya está registrado'
                }
            }

            const user: RegisterUserDto = {
                username: registerUserDto.username,
                email: registerUserDto.email,
                password: await this.hashService.hashPassword(registerUserDto.password),
                updated_at: new Date(),
                created_at: new Date(),
            }
            console.log(user);
            const data = await this.authService.register(user)
            return {
                ok: true,
                token: data,
                message: 'Usuario Creado Correctamente'
            }

        } catch (error) {
            return {
                ok: false,
                message: error
            }
        }
    }


    // @Get(':id')
    // async getByID(@Param('id') id: string) {
    //     return this.authService.getById(id)
    // }


}
