import { baseApi } from "../base.api";

export interface IUser {
  id: string;
  email: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<IUserResponse, ILoginRequest>({
      query: (params) => ({
        url: "/login",
        method: "POST",
        body: params,
      }),
    }),
    register: build.mutation<IUserResponse, IRegisterRequest>({
      query: (params) => ({
        url: "/register",
        method: "POST",
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation, useRegisterMutation } =
  authApi;
