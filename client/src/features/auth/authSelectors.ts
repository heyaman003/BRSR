import { createSelector } from '@reduxjs/toolkit';
interface AuthState {
    user: { [key: string]: any } | null;
    isLoading: boolean;
    error: string | null | undefined;
  }
type state={
 auth:AuthState,
}

export const selectAuthState = (state:state) => state.auth;

export const selectUser = createSelector(selectAuthState, (auth) => auth.user);
export const selectIsLoading = createSelector(selectAuthState, (auth) => auth.isLoading);
export const selectAuthError = createSelector(selectAuthState, (auth) => auth.error);
