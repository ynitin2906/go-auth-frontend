import axios, { AxiosError, AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_PREFIX = "/api";

export interface ApiResponse<T> {
  data: T;
  message: string;
  error?: string;
}
interface ApiResponseStructure<T> {
  error: boolean;
  code: number;
  message: string;
  data: T;
}
// Create axios instance
const axiosInstance = axios.create({
  // baseURL: NEXT_PUBLIC_API_URL + API_PREFIX,
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle successful responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const handleResponse = <T>(
  response: AxiosResponse<ApiResponseStructure<T>>
): ApiResponse<T> => {
  return {
    data: response.data.data, // Extract the actual data from `Data`
    message: response.data.message, // Extract the message from `Message`
  };
};

// The `getRequest` function now uses the `ApiResponseStructure` interface
export const getRequest = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.get<ApiResponseStructure<T>>(endpoint);
  return handleResponse(response);
};

export const postRequest = async <T, B>(
  endpoint: string,
  body: B
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<ApiResponseStructure<T>>(
    endpoint,
    body
  );
  return handleResponse(response);
};

export const putRequest = async <T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.put<ApiResponseStructure<T>>(
    endpoint,
    body
  );
  return handleResponse(response);
};

export const patchRequest = async <T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.patch<ApiResponseStructure<T>>(
    endpoint,
    body
  );
  return handleResponse(response);
};

export const deleteRequest = async (
  endpoint: string
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.delete(endpoint);
  return {
    data: null, // since you're deleting, the data should be null
    message: response.statusText,
  };
};

const loginHandleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return {
    data: response.data,
    message: "Successful",
  };
};

export const loginPostRequest = async <T, B>(
  endpoint: string,
  body: B
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<T>(endpoint, body);
  return loginHandleResponse(response);
};
