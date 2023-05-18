import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../../../types/User";

const ENDPOINT = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Ups! Something went wrong!");
      }

      return user;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  }
);
