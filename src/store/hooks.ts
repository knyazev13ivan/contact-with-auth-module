import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/auth.slice";
import { searchValue } from "./search/search.slice";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => user, [user]);
};

export const useSearchValue = () => {
  return useAppSelector(searchValue);
};

export const useUsername = () => {
  return useAppSelector(selectCurrentUser);
};
