import axios from "axios";
import {
  PermissionType,
  RegisterUserType,
  RoleType,
  UserDataType,
} from "../../types/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const refreshToken = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    withCredentials: true,
  });
};

//response interceptor to refresh token on receiving token expired error

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  async function (error) {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await refreshToken();
        return axios.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const getCategories = () => api.get(`category`);

export const getPermissions = async (): Promise<PermissionType[]> => {
  const response = await api.get(`permission`);
  return response.data;
};

// Returns Promise<User[]> (data only)
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data as UserDataType[];
};

export const getPermissionsOfUser = async (userId: string, name: string) => {
  const res = await api.get(`/user/${userId}/permission/${name}`);
  return res.data as string[];
};

export const getRoles = async () => {
  const res = await api.get<RoleType[]>("/role");
  return res.data;
};

export const deletePermissionById = async (id: string) => {
  return await api.delete(`/permission/${id}`);
};

export const deleteRoleById = async (id: string) => {
  return await api.delete(`/role/${id}`);
};

export const registerUser = async (data: RegisterUserType) => {
  return await api.post("/auth/register", data);
};
