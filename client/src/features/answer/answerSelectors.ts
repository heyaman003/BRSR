import { createSelector } from '@reduxjs/toolkit';
import { Section } from "@/models/models";


   
   interface sectionState {
     section: Section[];
     isLoading: boolean;
     error: string | null | undefined;
   }
export const selectSectionState = (state:sectionState) => state;

export const getsectiondeatils = createSelector(selectSectionState, (section) => section.section);
export const selectIsLoading = createSelector(selectSectionState, (section) => section.isLoading);
export const selectSectionError = createSelector(selectSectionState, (section) => section.error);