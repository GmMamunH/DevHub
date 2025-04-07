// redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage ব্যবহারের জন্য
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import answerReducer from "./answerSlice";
import userReducer from "./userSlice";

// persist করার config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // শুধু auth persist করবো
};

// সব reducer একসাথে combine
const rootReducer = combineReducers({
  auth: authReducer,
  questions: questionReducer,
  answers: answerReducer,
  user: userReducer,
});

// persisted reducer বানাও
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store তৈরি
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist এর জন্য এটা disable করতে হয়
    }),
});

// persistor তৈরি
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
