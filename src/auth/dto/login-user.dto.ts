import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty({message: 'El campo correo no puede estar vacio'})
    email: string;

    @IsNotEmpty({message: 'El campo normbre de usuario no puede estar vacio'})
    username: string;

    @IsNotEmpty({message: 'El campo contrasena no puede estar vacio'})
    password: string;


}