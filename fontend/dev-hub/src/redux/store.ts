
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import answerReducer from "./answerSlice";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
