import { Role } from 'src/role/role.schema';
export declare class CreateUsersDTO {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Role[];
    readonly status: string;
}
