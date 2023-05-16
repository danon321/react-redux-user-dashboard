import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../../../types/User";

const ENDPOINT = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;

export const getUsers = createAsyncThunk<User[]>(
  "users/getUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(ENDPOINT);

      if (!response.ok) {
        throw new Error("Ups! Something went wrong!");
      }

      const users: User[] = await response.json();

      return users;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  }
);
