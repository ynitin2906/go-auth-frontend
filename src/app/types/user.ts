import { Note } from "./notes";
import { Task } from "./tasks";

export interface CreateUser {
  name: string;
  password: string;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface TokenResponse {
  message: string;
  token: string;
}

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export interface UserResponseData {
  id: string;
  name: string;
  email: string;
  notes: Note[];
  tasks: Task[];
  profile_picture: string;
  social_media: SocialMedia;
}

export interface SocialMedia {
  twitter: string;
  linkedin: string;
  github: string;
  facebook: string;
  instagram: string;
  snapchat: string;
  youtube: string;
  pinterest: string;
  discord: string;
  website: string;
}
