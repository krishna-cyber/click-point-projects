import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(loginCredentials: LoginAuthDTO) {
    const user = await this.userService.findOne(loginCredentials.email);

    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user?.password as string,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credentials do not match');
    }

    const payload = {
      sub: user?._id,
      email: user?.email,
      username: user?.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
      }),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
