import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";

import { getUsers } from "./api/getUsers";
import { deleteUser } from "./api/deleteUser";
import { updateUser } from "./api/updateUser";

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
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = UserLoadStatus.loading;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = UserLoadStatus.succeeded;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<string | any>) => {
        state.status = UserLoadStatus.failed;
        state.error = action.payload;
      });
    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user: User) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    });
  },
});

export const { addUser } = userSlice.actions;

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
