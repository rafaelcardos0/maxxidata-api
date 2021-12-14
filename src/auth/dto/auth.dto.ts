import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsAlphanumeric } from 'class-validator';

export class AuthDto {
    @IsAlphanumeric()
    @MinLength(4)
    @ApiProperty()
    username: string;

    @MinLength(6)
    @ApiProperty()
    password: string;
}
