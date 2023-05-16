import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";

import { getUsers } from "./api/getUsers";

import { User, UserLoadStatus } from "../../types/User";

interface UserState {
  users: User[];
  status: UserLoadStatus;
  error: string;
}

const initialState: UserState = {
  users: [],
  status: UserLoadStatus.idle,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = UserLoadStatus.loading;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = UserLoadStatus.succeeded;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: any) => {
        state.status = UserLoadStatus.failed;
        state.error = action.payload;
      });
  },
});

// export const {} = userSlice.actions;

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
