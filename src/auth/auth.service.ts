import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { PayloadDto } from './dto/payload.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService  
  ) {}

  async validateUser(username: string, password: string): Promise<PayloadDto> | null {
    const user = await this.usersService.findByUsername(username);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (user && user.isActive && passwordMatch ) {
      const result: PayloadDto = {
        id: user.id,
        username: user.username
      };
      return result;
    }
    return null;
  }

  async login(user: AuthDto): Promise<AuthResponseDto> {
    const validUser: PayloadDto = await this.validateUser(user.username, user.password);
    if (!validUser) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.jwtService.sign(validUser)
    };
  }
}
