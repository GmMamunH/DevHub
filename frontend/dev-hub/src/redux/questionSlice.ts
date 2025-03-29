import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// ✅ নতুন প্রশ্ন যোগ করার জন্য API কল
export const postQuestion = createAsyncThunk(
  "questions/post",
  async ({ title, description }: { title: string; description: string }) => {
    const token = localStorage.getItem("token"); // ⬅️ টোকেন সংগ্রহ করো

    const response = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ⬅️ টোকেন যোগ করো
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error("Unauthorized request");
    }

    return response.json();
  }
);


// সব প্রশ্ন ফেচ করার জন্য
export const fetchQuestions = createAsyncThunk("questions/fetch", async () => {
  const response = await fetch("http://localhost:5000/api/questions");
  return response.json();
});

// সার্চ করার জন্য API কল
export const searchQuestions = createAsyncThunk(
  "questions/search",
  async ({ query, category }: { query: string; category: string }) => {
    const response = await fetch(
      `http://localhost:5000/api/questions/search?query=${query}&category=${category}`
    );
    return response.json();
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState: { questions: [], searchResults: null, loading: false },
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = null; // Reset করলে আবার সব প্রশ্ন দেখাবে
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(searchQuestions.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const { resetSearchResults } = questionSlice.actions;
export default questionSlice.reducer;
