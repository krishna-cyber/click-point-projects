"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let AuthService = class AuthService {
    userService;
    jwtService;
    jwtRefreshService;
    jwtAccessService;
    configService;
    constructor(userService, jwtService, jwtRefreshService, jwtAccessService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.jwtRefreshService = jwtRefreshService;
        this.jwtAccessService = jwtAccessService;
        this.configService = configService;
    }
    async signIn(loginCredentials) {
        const user = await this.userService.findOne(loginCredentials.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credentials do not match');
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(loginCredentials.password, user?.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Credentials do not match', {
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
    async refreshToken(refreshTokenCookie) {
        try {
            const isValidJWT = await this.jwtRefreshService.verifyAsync(refreshTokenCookie);
            const user = await this.userService.findById(isValidJWT.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const access_token = await this.jwtAccessService.signAsync({
                sub: user._id,
                email: user.email,
                username: user.name,
            });
            return access_token;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid refresh token or expired');
        }
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('JWT_REFRESH')),
    __param(3, (0, common_1.Inject)('JWT_ACCESS')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        jwt_1.JwtService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map