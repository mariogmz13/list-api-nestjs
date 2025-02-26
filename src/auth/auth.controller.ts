import { Body, Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
        // private readonly hashService: HashService,
    ) { }


    @Get('login')
    async login(@Body() login: LoginUserDto) {
        return this.authService.validateUser(login.email, login.password)

        // const user: CreateUserDto = {
        //                 username: createUserDto.username,
        //                 email: createUserDto.email,
        //                 password: await this.hashService.hashPassword(createUserDto.password),
        //                 updated_at: new Date(),
        //                 created_at: new Date(),
        //             }
    }
    

    @Get(':id')
    async getByID(@Param('id') id: string) {
        return this.authService.getById(id)
    }


}
