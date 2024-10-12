import { CreateNote, Note } from "../types/notes";
import {
  ApiResponse,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "./apiService";

export const createNote = async (
  payload: CreateNote
): Promise<ApiResponse<Note>> => {
  const response = await postRequest<Note, CreateNote>("/notes", payload);
  return response;
};

export const updateNote = async (
  id: string,
  // payload: CreateNote
  payload: Record<string, unknown>
): Promise<ApiResponse<Note>> => {
  // Call patchRequest with the correct type arguments
  const response = await patchRequest<Note>(`/notes/${id}`, payload);
  return response;
};

export const getUserNotes = async (): Promise<ApiResponse<Note[]>> => {
  const response = await getRequest<Note[]>("/notes/user");
  return response;
};

export const deleteNote = async (id: string): Promise<ApiResponse<null>> => {
  const response = await deleteRequest(`/notes/${id}`);
  return response;
};

// export const getAllNotes = async (): Promise<ApiResponse<Note[]>> => {
//   const response = await getRequest<Note[]>("/notes");
//   return response;
// };
export const getNotesByUserId = async (
  id: string
): Promise<ApiResponse<Note[]>> => {
  const response = await getRequest<Note[]>(`/notes/user/${id}`);
  return response;
};
export const getNoteById = async (id: string): Promise<ApiResponse<Note>> => {
  const response = await getRequest<Note>(`/notes/${id}`);
  return response;
};
