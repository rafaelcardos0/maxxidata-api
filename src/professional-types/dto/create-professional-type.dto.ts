import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfessionalTypeDto {
    @IsNotEmpty()
    @ApiProperty()
    descricao: string;

    @ApiPropertyOptional()
    situacao?: boolean;
}