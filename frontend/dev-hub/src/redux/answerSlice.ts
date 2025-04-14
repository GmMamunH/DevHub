import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Answer Interface (TypeScript)
interface Answer {
  _id: string;
  text: string;
  user: { username: string };
  upvotes: { length: number };
  downvotes: { length: number };
}

interface AnswerState {
  answers: Answer[];
}

const initialState: AnswerState = {
  answers: [],
};

// ✅ Fetch Answers
export const fetchAnswers = createAsyncThunk<Answer[], string>(
  "answers/fetch",
  async (questionId) => {
    const response = await fetch(
      `http://localhost:5000/api/answers/${questionId}`
    );
    return response.json();
  }
);

// ✅ Post Answer
export const postAnswer = createAsyncThunk<
  Answer,
  { questionId: string; text: string }
>("answers/post", async ({ questionId, text }) => {
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
});

// ✅ Upvote Answer (Optimistic UI)
export const upvoteAnswer = createAsyncThunk<Answer, string>(
  "answers/upvote",
  async (answerId) => {
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

// ✅ Downvote Answer (Optimistic UI)
export const downvoteAnswer = createAsyncThunk<Answer, string>(
  "answers/downvote",
  async (answerId) => {
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

// ✅ Answer Slice
const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });

    builder.addCase(postAnswer.fulfilled, (state, action) => {
      state.answers.push(action.payload);
    });

    builder.addCase(upvoteAnswer.pending, (state, action) => {
      const index = state.answers.findIndex((a) => a._id === action.meta.arg);
      if (index !== -1) {
        state.answers[index].upvotes.length += 1;
      }
    });

    builder.addCase(upvoteAnswer.fulfilled, (state, action) => {
      const updatedAnswer = action.payload;
      const index = state.answers.findIndex((a) => a._id === updatedAnswer._id);
      if (index !== -1) {
        state.answers[index] = updatedAnswer;
      }
    });

    builder.addCase(downvoteAnswer.pending, (state, action) => {
      const index = state.answers.findIndex((a) => a._id === action.meta.arg);
      if (index !== -1) {
        state.answers[index].downvotes.length += 1;
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
