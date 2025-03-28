import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Answer type interface
interface Answer {
  _id: string;
  text: string;
  votes: number;
}

interface AnswerState {
  answers: Answer[];
}

const initialState: AnswerState = {
  answers: [],
};

// Fetch Answers
export const fetchAnswers = createAsyncThunk(
  "answers/fetch",
  async (questionId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/answers/${questionId}`
    );
    return response.json();
  }
);

// Post Answer
export const postAnswer = createAsyncThunk(
  "answers/post",
  async ({ questionId, text }: { questionId: string; text: string }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/answers/${questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ text }),
      }
    );
    return response.json();
  }
);

// Upvote Answer
export const upvoteAnswer = createAsyncThunk(
  "answers/upvote",
  async (answerId: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/answers/${answerId}/upvote`,
      {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );
    return response.json();
  }
);

// Downvote Answer
export const downvoteAnswer = createAsyncThunk(
  "answers/downvote",
  async (answerId: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/answers/${answerId}/downvote`,
      {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );
    return response.json();
  }
);

// Answer Slice
const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });

    builder.addCase(upvoteAnswer.fulfilled, (state, action) => {
      const updatedAnswer = action.payload;
      const index = state.answers.findIndex((a) => a._id === updatedAnswer._id);
      if (index !== -1) {
        state.answers[index] = updatedAnswer;
      }
    });

    builder.addCase(downvoteAnswer.fulfilled, (state, action) => {
      const updatedAnswer = action.payload;
      const index = state.answers.findIndex((a) => a._id === updatedAnswer._id);
      if (index !== -1) {
        state.answers[index] = updatedAnswer;
      }
    });
  },
});

export default answerSlice.reducer;
