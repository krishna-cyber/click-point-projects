export interface PermissionType {
  _id?: string;
  name: string;
  action: string;
}

export interface RoleType {
  _id: string;
  name: string;
  permissions: PermissionType[];
}

export interface UserDataType {
  _id: string;
  name: string;
  email: string;
  roles: RoleType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterUserType {
  name: string;
  email: string;
  password: string;
  confirm?: string;
  roles: string[];
}

export interface CreateRoleType {
  name: string;
  permissions: string[];
}

export interface CreatePermissionType {
  name: string;
  action: string;
}
