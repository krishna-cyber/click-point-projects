import { AuthService } from './auth.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import express from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginCredentials: LoginAuthDTO, response: express.Response): Promise<void>;
    refreshToken(request: express.Request, response: express.Response): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
