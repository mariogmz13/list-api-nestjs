import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty({message: 'El campo correo no puede estar vacio'})
    email: string;

    @IsNotEmpty({message: 'El campo nombre de usuario no puede estar vacio'})
    username: string;

    @IsNotEmpty({message: 'El campo contrasena no puede estar vacio'})
    password: string;

    @IsDate()
    @IsOptional()
    created_at: Date;

    @IsDate()
    @IsOptional()
    updated_at: Date;
}