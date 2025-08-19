import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    {
      provide: 'JWT_REFRESH',
      useFactory: (configService: ConfigService) =>
        new JwtService({
          secret: configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
          signOptions: { expiresIn: '1d' },
        }),
      inject: [ConfigService],
    },
    {
      provide: 'JWT_ACCESS',
      useFactory: (configService: ConfigService) =>
        new JwtService({
          secret: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
