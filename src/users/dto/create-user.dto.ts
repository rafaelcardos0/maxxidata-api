import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MinLength, IsAlphanumeric, Matches } from 'class-validator';

export class CreateUserDto {
    @Matches(/[a-zA-Z ]/)
    @ApiProperty()
    name: string;
    
    @IsAlphanumeric()
    @MinLength(4)
    @ApiProperty()
    username: string;

    @MinLength(6)
    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    isActive?: boolean; 
}
