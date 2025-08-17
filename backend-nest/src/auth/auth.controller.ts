import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import express from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginCredentials: LoginAuthDTO,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    try {
      const { access_token, refresh_token, user } =
        await this.authService.signIn(loginCredentials);
      response.cookie('accessToken', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 600000, //1hr
      });

      response.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1d
      });

      response.json({
        message: 'login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
