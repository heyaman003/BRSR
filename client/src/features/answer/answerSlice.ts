import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Section } from "@/models/models";
import { sectionfetchAPI } from "../sections/sectionAPI";

interface sectionInfo {
 companyID:String
}

interface sectionState {
  section: Section[];
  isLoading: boolean;
  error: string | null | undefined;
}
// const initalStateUser:UserInformation={
//   role:'',

// }
const initialState: sectionState = {
    section: [],
    isLoading: false,
     error: null,
};

export const getSectiondata = createAsyncThunk<
  any,
  sectionInfo,
  { rejectValue: string }
>("data/sections", async (companyDesc, { rejectWithValue }) => {
  try {
    const response = await sectionfetchAPI(companyDesc);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    updateSectiondata: (state) => {
        //some logic for the updatingsection will be here 
    //   state.user = null;
    //   state.error = null;
    //   sessionStorage.removeItem("user");
    //   sessionStorage.removeItem("isLoggedIn");
    console.log("updateSectiondata",state)
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSectiondata.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSectiondata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.section = action.payload;
      })
      .addCase(getSectiondata.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSectiondata } = sectionSlice.actions;
export default sectionSlice.reducer;
