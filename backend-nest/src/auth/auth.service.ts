import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
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
    @Inject('JWT_REFRESH') private readonly jwtRefreshService: JwtService,
    @Inject('JWT_ACCESS') private readonly jwtAccessService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(loginCredentials: LoginAuthDTO) {
    const user = await this.userService.findOne(loginCredentials.email);
    if (!user) {
      throw new UnauthorizedException('Credentials do not match');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user?.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credentials do not match', {
        cause: loginCredentials.email,
      });
    }

    const payload = {
      sub: user?._id,
      email: user?.email,
      username: user?.name,
    };

    const access_token = await this.jwtAccessService.signAsync(payload);
    const refresh_token = await this.jwtRefreshService.signAsync(payload);

    return { access_token, refresh_token, user };
  }

  async refreshToken(refreshTokenCookie: string) {
    try {
      interface JwtPayload {
        sub: string;
        email: string;
        username: string;
        iat?: number;
        exp?: number;
        [key: string]: any;
      }

      const isValidJWT =
        await this.jwtRefreshService.verifyAsync<JwtPayload>(
          refreshTokenCookie,
        );

      const user = await this.userService.findById(isValidJWT.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const access_token = await this.jwtAccessService.signAsync({
        sub: user._id,
        email: user.email,
        username: user.name,
      });

      return access_token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token or expired');
    }
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
