import { createSelector } from '@reduxjs/toolkit';

export const selectSectionState = (state) => state.section;

export const getsectiondeatils = createSelector(selectSectionState, (section) => section.section);
export const selectIsLoading = createSelector(selectSectionState, (section) => section.isLoading);
export const selectSectionError = createSelector(selectSectionState, (section) => section.error);