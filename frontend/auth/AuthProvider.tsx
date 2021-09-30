import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";

// Chua xong...
// Ranh lam di Phuc
// Dang nhap, luu state ay

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface Token {
  access: string;
}

type Enpoint = "token" | "token-destroy" | "profile";

const make_url = (enpoint: Enpoint): string => {
  const base_url = "http://nginx/auth/";
  return base_url + enpoint;
};

const fetch_token = (
  username: string,
  password: string
): Promise<AxiosResponse<any>> => {
  const url = make_url("token");
  return axios.post(url, { username, password });
};

const fetch_user = async (token: string): Promise<AxiosResponse<any>> => {
  const url = make_url("profile");
  const config = {
    headers: { Authorization: `Token ${token}` },
  };
  return axios.post(url, config);
};

type AuthContextProps = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<AxiosResponse<any>>;
  logout: () => void;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): React.ReactNode => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const setNotAuthenticated = (): void => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
  };

  const initUser = async (token: string): Promise<void> => {
    const response = await fetch_user(token);
    const user = response.data;
    setUser(user);
  };

  const handleNewToken = (data: Token): void => {
    setAccessToken(data.access);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const login = async (
    username: string,
    password: string
  ): Promise<AxiosResponse<any>> => {
    const response = await fetch_token(username, password);
    const data = response.data;
    if (data["error"] === false) {
      const token_data: Token = { access: data["token"] };
      handleNewToken(token_data);
      await initUser(token_data.access);
    } else {
      setIsAuthenticated(false);
      setLoading(true);
    }
    return response;
  };

  const logout = (): void => {
    const url = make_url("token-destroy");
    const config = {
      headers: { Authorization: `Token ${accessToken}` },
    };
    setAccessToken("");
    setNotAuthenticated();
    axios.get(url, config);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
