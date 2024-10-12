"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUser,
  // getLogdinUser,
  // getUserById,
  loginUser,
} from "../services/userService";
import { DecodedToken, UserResponseData } from "../types/user";
import { useAppDispatch } from "../store/hooks";
import { setUserInStore } from "../slices/userSlice";
// import { setUserInStore } from "../slices/userSlice";
// import { useAppDispatch } from "../store/hooks";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  returnUserFromToken: (token: string) => DecodedToken | null;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  userFromToken: DecodedToken | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userFromToken, setUserFromToken] = useState<DecodedToken | null>(null);
  const [isCalled, setIsCalled] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const decodedUser = returnUserFromToken(token);
      // console.log(decodedUser);

      if (decodedUser) {
        setUserFromToken(decodedUser);
        setIsAuthenticated(true);
      }
    }

    setIsCalled(true);
  }, []);
  console.log(userFromToken);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUser({ email, password });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        const decodedUser = returnUserFromToken(data.token);
        if (decodedUser) {
          setUserFromToken(decodedUser);
          setIsAuthenticated(true);
          // router.push(`/profile/${decodedUser.id}`);
          router.push(`/profile`);
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserFromToken(null);
    localStorage.removeItem("token");
    router.push("/login");
    dispatch(setUserInStore(null as unknown as UserResponseData));
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await createUser({ name, email, password });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        const decodedUser = returnUserFromToken(data.token);
        if (decodedUser) {
          setUserFromToken(decodedUser);
          setIsAuthenticated(true);
          router.push(`/profile`);
        }
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  };

  const returnUserFromToken = (token: string): DecodedToken | null => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));

      const userId = decodedPayload.userId;
      const userEmail = decodedPayload.email;
      const userRole = decodedPayload.role;

      return {
        id: userId,
        email: userEmail,
        role: userRole,
      };
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = userFromToken?.id
  //         ? await getUserById(userFromToken?.id) // Fetch other user's data if userId is provided
  //         : await getLogdinUser(); // Fetch logged-in user data
  //       console.log(data);

  //       dispatch(setUserInStore(data.data));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userFromToken]);
  return (
    <AuthContext.Provider
      value={{
        userFromToken,
        isAuthenticated,
        login,
        logout,
        register,
        returnUserFromToken,
      }}
    >
      {isCalled && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
