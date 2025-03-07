import { createSelector } from '@reduxjs/toolkit';

export const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(selectAuthState, (auth) => auth.user);
export const selectIsLoading = createSelector(selectAuthState, (auth) => auth.isLoading);
export const selectAuthError = createSelector(selectAuthState, (auth) => auth.error);
