import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserInformation extends LoginCredentials{
  role:string;
}

interface AuthState {
  user: { [key: string]: any } | null;
  isLoading: boolean;
  error: string | null | undefined;
}


const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  any,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserAPI(credentials);
    console.log("auth slice response--",response);
    localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem("isLoggedIn", "true");
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    },
    updateCompany: (state,action) => {
      if (state.user) {
        state.user.data.companyId = action.payload; // Update only the companyId
        localStorage.setItem("user", JSON.stringify(state.user)); // Save updated user
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log("logging user detailks and seeting---",action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,updateCompany } = authSlice.actions;
export default authSlice.reducer;
