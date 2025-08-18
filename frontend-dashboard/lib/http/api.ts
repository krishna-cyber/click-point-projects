import axios from "axios";
import { PermissionType, RoleType, UserDataType } from "../../types/types";
// import { UserDataType } from "../../app/dashboard/role/component/roleTable";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const refreshToken = async () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/auth/refresh`,
    {},
    { withCredentials: true }
  );
};

//response interceptor to refresh token on receiving token expired error

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }
  // async function (error) {
  //   const originalRequest = error.config;

  //   // const headers = { ...originalRequest.headers };

  //   if (error?.response?.status === 401 && !originalRequest._retry) {
  //     try {
  //       await refreshToken();
  //       originalRequest._retry = true;
  //       return axios.request(originalRequest);
  //     } catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }

  //   return Promise.reject(error);
  // }
);

export const getCategories = () => api.get(`category`);

// Returns Promise<User[]> (data only)
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data as UserDataType[];
};

export const getPermissionsOfUser = async () => {
  const res = await api.get("/permission/list/user");
  return res.data as string[];
};

export const getRoles = async () => {
  const res = await api.get<RoleType[]>("/role");
  return res.data;
};
// If you still need the full AxiosResponse with headers/status, you can expose:
// export const getUsersResponse = () => api.get<User[]>("/users");
