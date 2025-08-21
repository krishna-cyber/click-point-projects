import { UsersService } from 'src/users/users.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly jwtRefreshService;
    private readonly jwtAccessService;
    private readonly configService;
    constructor(userService: UsersService, jwtService: JwtService, jwtRefreshService: JwtService, jwtAccessService: JwtService, configService: ConfigService);
    signIn(loginCredentials: LoginAuthDTO): Promise<{
        access_token: string;
        refresh_token: string;
        user: import("mongoose").Document<unknown, {}, import("../users/users.schema").User, {}, {}> & import("../users/users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    refreshToken(refreshTokenCookie: string): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number): string;
    remove(id: number): string;
}
