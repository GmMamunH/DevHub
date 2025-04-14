// redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage ব্যবহারের জন্য
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import answerReducer from "./answerSlice";
import userReducer from "./userSlice";

// persist  config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

// reducer  combine
const rootReducer = combineReducers({
  auth: authReducer,
  questions: questionReducer,
  answers: answerReducer,
  user: userReducer,
});

// persisted reducer 
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistor 
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
