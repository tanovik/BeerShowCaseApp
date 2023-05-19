import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import beerReducer from "../features/beerSlice";

export const store = configureStore({
  reducer: {
    beerPage: beerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
