import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: { [key: string]: any } | null;
  isLoading: boolean;
  error: string | null | undefined;
}


const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem("user") || "null"),
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
    sessionStorage.setItem("user", JSON.stringify(response));
    sessionStorage.setItem("isLoggedIn", "true");
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
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isLoggedIn");
    },
    updateCompany: (state,action) => {
      if (state.user) {
        state.user.data.companyId = action.payload; // Update only the companyId
        sessionStorage.setItem("user", JSON.stringify(state.user)); // Save updated user
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,updateCompany } = authSlice.actions;
export default authSlice.reducer;
