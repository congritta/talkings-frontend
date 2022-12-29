import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import MessageModel from "../../models/Message";
import UserModel from "../../models/User";
import {RootState} from "../store";

// Define a type for the slice state
export interface InitialState {
  users: UserModel[],
  messages: MessageModel[];
}

// Define the initial state using that type
const initialState: InitialState = {
  users: [],
  messages: []
};

// `createSlice` will infer the state type from the `initialState` argument
export const commonDataSlice = createSlice({
  name: "commonData",
  initialState,
  reducers: {

    setUsers(state, action: PayloadAction<InitialState["users"]>) {
      state.users = action.payload;
    },

    setMessages(state, action: PayloadAction<InitialState["messages"]>) {
      state.messages = action.payload;
    }
  }
});

export const {setUsers, setMessages} = commonDataSlice.actions;
export const getUsers = (state: RootState) => state.common.users;
export const getMessages = (state: RootState) => state.common.messages;
export default commonDataSlice.reducer;
