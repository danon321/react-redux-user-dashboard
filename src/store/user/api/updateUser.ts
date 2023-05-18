import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../../../types/User";

const ENDPOINT = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENDPOINT}/${user.id}`, {
        method: "PATCH",
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
