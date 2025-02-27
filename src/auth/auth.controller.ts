import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
        // private readonly hashService: HashService,
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
                message: error
            }
        }
        
        // const user: CreateUserDto = {
        //                 username: createUserDto.username,
        //                 email: createUserDto.email,
        //                 password: await this.hashService.hashPassword(createUserDto.password),
        //                 updated_at: new Date(),
        //                 created_at: new Date(),
        //             }
    }
    

    // @Get(':id')
    // async getByID(@Param('id') id: string) {
    //     return this.authService.getById(id)
    // }


}
