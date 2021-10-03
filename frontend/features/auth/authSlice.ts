import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface Token {
  access: string;
}

export interface AuthState {
  is_loading: boolean;
  is_authenticated: boolean;
  user: User | null;
}

type Enpoint = "token" | "token-destroy" | "profile";

const make_url = (enpoint: Enpoint): string => {
  const relative_url = "auth/";
  return relative_url + enpoint + "/";
};

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<Token>> => {
  const url = make_url("token");
  return axios.post(url, { username: username, password: password });
};

export const logout = (user_id: number) => {
  const url = make_url("token-destroy");
  const response = axios.delete(url, { data: { id: user_id } });
  response
    .then(() => localStorage.removeItem("key"))
    .catch(() => localStorage.removeItem("key"));
};

const initialState: AuthState = {
  is_loading: false,
  is_authenticated: false,
  user: null,
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
    set_unauthenticated: (state) => {
      state.is_authenticated = false;
      state.user = null;
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
    });
    auth.addCase(fetch_user.rejected, (state, action) => {
      state.is_loading = false;
      state.is_authenticated = false;
      state.user = null;
    });
  },
});

// export select_is_authenticated = (state: AuthState) => state.auth.is_

const { actions, reducer } = AuthSlice;

export const { set_unauthenticated } = actions;

export default reducer;
