import {
  CreateUser,
  LoginUser,
  TokenResponse,
  UserResponseData,
} from "../types/user";
import {
  ApiResponse,
  getRequest,
  loginPostRequest,
  patchRequest,
  // postRequest,
} from "./apiService";

export const createUser = async (
  payload: CreateUser
): Promise<ApiResponse<TokenResponse>> => {
  // API call to create user
  const response = await loginPostRequest<TokenResponse, CreateUser>(
    "/signup",
    payload
  );
  return response;
};

export const loginUser = async (
  payload: LoginUser
): Promise<ApiResponse<TokenResponse>> => {
  // API call to login user
  const response = await loginPostRequest<TokenResponse, LoginUser>(
    "/login",
    payload
  );
  return response;
};

export const getLogdinUser = async (): Promise<
  ApiResponse<UserResponseData>
> => {
  const response = await getRequest<UserResponseData>("/loggedinuser");
  return response;
};
export const getAllUsers = async (): Promise<
  ApiResponse<UserResponseData[]>
> => {
  const response = await getRequest<UserResponseData[]>("/users/all");
  return response;
};
export const getUserById = async (
  id: string
): Promise<ApiResponse<UserResponseData>> => {
  const response = await getRequest<UserResponseData>(`/users/${id}`);
  return response;
};
export const updateUserProfile = async (
  // id: string,
  payload: Record<string, unknown>
): Promise<ApiResponse<UserResponseData>> => {
  const response = await patchRequest<UserResponseData>(
    `/loggedinuser/`,
    payload
  );
  return response;
};

export const getAllAvatars = async (): Promise<ApiResponse<string[]>> => {
  const response = await getRequest<string[]>("/allavatar");
  return response;
};
