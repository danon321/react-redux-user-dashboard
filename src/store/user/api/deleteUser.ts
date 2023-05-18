import { createAsyncThunk } from "@reduxjs/toolkit";

const ENDPOINT = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userID: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENDPOINT}/${userID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ups! Something went wrong!");
      }

      return userID;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  }
);
