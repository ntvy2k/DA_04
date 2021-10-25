import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";

interface BaseInfo {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface User extends BaseInfo {
  id: number;
}

export interface Token {
  access: string;
}

export interface AuthState {
  is_loading: boolean;
  is_authenticated: boolean;
  user: User | null;
  userName: string | null;
}

type Enpoint = "token" | "token-destroy" | "profile" | "register";

const make_url = (enpoint: Enpoint): string => {
  const relative_url = "http://localhost/auth/";
  return relative_url + enpoint + "/";
};

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<Token>> => {
  const url = make_url("token");
  return axios.post(url, { username: username, password: password });
};

export const logout = (token: string) => {
  const url = make_url("token-destroy");
  const config = {
    headers: { Authorization: `Token ${token}` },
  };
  return axios.delete(url, config);
};

// Register Zone

export interface RegisterForm extends BaseInfo {
  password: string;
}

/**
 * 0: Successful
 * 1: Username already exists
 * 2: Email already exists
 */
export type RegisterStatus = {
  status: 0 | 1 | 2;
};

export const register = (
  user_form: RegisterForm
): Promise<AxiosResponse<RegisterStatus>> => {
  const url = make_url("register");
  return axios.post(url, user_form);
};

// End Register Zone

const initialState: AuthState = {
  is_loading: false,
  is_authenticated: false,
  user: null,
  userName: null,
};

export const fetch_user = createAsyncThunk<User, string>(
  "auth/fetch",
  async (token: string) => {
    const url = make_url("profile");
    const config = {
      headers: { Authorization: `Token ${token}` },
    };
    const response = await axios.get(url, config);
    return response.data as User;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set_not_authenticated: (state) => {
      state.is_authenticated = false;
      state.user = null;
      state.userName = null;
    },
  },
  extraReducers: (auth) => {
    auth.addCase(fetch_user.pending, (state, action) => {
      state.is_loading = true;
    });
    auth.addCase(fetch_user.fulfilled, (state, action) => {
      state.is_loading = false;
      state.is_authenticated = true;
      state.user = action.payload;
      state.userName = `${action.payload.last_name} ${action.payload.first_name}`
    });
    auth.addCase(fetch_user.rejected, (state, action) => {
      state.is_loading = false;
      state.is_authenticated = false;
      state.user = null;
      state.userName = null
    });
  },
});

const { actions, reducer } = AuthSlice;

export const { set_not_authenticated } = actions;

export default reducer;
