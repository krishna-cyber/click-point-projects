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
  createdAt: string;
  updatedAt: string;
}
