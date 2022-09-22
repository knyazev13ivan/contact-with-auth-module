import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUserResponse } from "./auth.api";
import type { RootState } from "../store";

interface IAuthState {
  user: string | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: window.localStorage.getItem("user") || null,
  token: window.localStorage.getItem("token") || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, accessToken } }: PayloadAction<IUserResponse>
    ) => {
      state.user = user.email;
      state.token = accessToken;
      if (accessToken) window.localStorage.setItem("token", accessToken);
      if (user.email) window.localStorage.setItem("user", user.email);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
