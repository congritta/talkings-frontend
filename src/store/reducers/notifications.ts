import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import NotificationModel from "../../models/Notification";

// Define a type for the slice state
export interface InitialState {
  notifications: NotificationModel[];
}

// Define the initial state using that type
const initialState: InitialState = {
  notifications: []
};

// `createSlice` will infer the state type from the `initialState` argument
export const commonDataSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {

    setNotifications(state, action: PayloadAction<NotificationModel[]>) {
      state.notifications = action.payload;
    }
  }
});

export const {setNotifications} = commonDataSlice.actions;
export const getNotifications = (state: RootState) => state.notifications.notifications;
export default commonDataSlice.reducer;
