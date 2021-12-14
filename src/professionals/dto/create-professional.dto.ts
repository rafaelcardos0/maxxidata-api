import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { ProfessionalType } from 'src/professional-types/entities/professional-type.entity';

export class CreateProfessionalDto {
    @Matches(/[a-zA-Z ]/)
    @ApiProperty()
    nome: string;

    @Matches(/^\((\d{2})\) (\d{4,5})-(\d{4})/)
    @ApiProperty()
    telefone: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNumber()
    @ApiProperty()
    tipoDeProfissional: Number;

    @ApiPropertyOptional()
    situacao?: boolean;

    professionalType: ProfessionalType;
}