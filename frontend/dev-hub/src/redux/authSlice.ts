import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: any, thunkAPI) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
