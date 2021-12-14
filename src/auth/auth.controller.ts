import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorators';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Autentica um usuário ativo' })
  @ApiResponse({ status: 201, type: AuthResponseDto, description: 'Usuário logado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
