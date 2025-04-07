import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string) => {
    const token = localStorage.getItem("token");
    console.log("JWT Token:", token);
    const response = await fetch(
      `http://localhost:5000/api/users/profile/${userId}`,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, questions: [], answers: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.questions = action.payload.questions;
      state.answers = action.payload.answers;
    });
  },
});

export default userSlice.reducer;
