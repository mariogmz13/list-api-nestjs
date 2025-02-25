import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateActivityDto {

    @IsNotEmpty({message: 'El campo titulo no puede estar vacio'})
    title: string;

    @IsOptional()
    description: string;

    @IsBoolean({message: 'El campo completado debería de ser una afirmación'})
    @IsOptional()
    complete: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    @IsDate()
    @IsOptional()
    updated_at: Date;
}