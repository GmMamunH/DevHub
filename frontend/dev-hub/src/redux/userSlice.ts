import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string) => {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    questions: [],
    answers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Make sure 'user' is being set
        state.questions = action.payload.questions;
        state.answers = action.payload.answers;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
