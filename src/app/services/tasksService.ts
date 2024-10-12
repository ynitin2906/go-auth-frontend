import { CreateTask, Task } from "../types/tasks";
import {
  ApiResponse,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "./apiService";

// Create a new task
export const createTask = async (
  payload: CreateTask
): Promise<ApiResponse<Task>> => {
  const response = await postRequest<Task, CreateTask>("/tasks", payload);
  return response;
};

// Update an existing task by ID
export const updateTask = async (
  id: string,
  payload: Record<string, unknown>
): Promise<ApiResponse<Task>> => {
  const response = await patchRequest<Task>(`/tasks/${id}`, payload);
  return response;
};

// Get all tasks for the current user
export const getUserTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response = await getRequest<Task[]>("/tasks/user");
  return response;
};

// Delete a task by ID
export const deleteTask = async (id: string): Promise<ApiResponse<null>> => {
  const response = await deleteRequest(`/tasks/${id}`);
  return response;
};

// Get tasks by a specific user ID
export const getTasksByUserId = async (
  id: string
): Promise<ApiResponse<Task[]>> => {
  const response = await getRequest<Task[]>(`/tasks/user/${id}`);
  return response;
};

// Get a single task by its ID
export const getTaskById = async (id: string): Promise<ApiResponse<Task>> => {
  const response = await getRequest<Task>(`/tasks/${id}`);
  return response;
};
