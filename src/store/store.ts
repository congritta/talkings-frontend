import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";

// import {load, save} from "redux-localstorage-simple";

import commonReducer from "./reducers/common";
import notificationsReducer from "./reducers/notifications";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",

  reducer: combineReducers({

    common: commonReducer,
    notifications: notificationsReducer
  }),

  // --- Uncomment below to enable localStorage
  // preloadedState: load(),
  // enhancers: [applyMiddleware(save({
  //   ignoreStates: ["notifications"]
  // }))]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
