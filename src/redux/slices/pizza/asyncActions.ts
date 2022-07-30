import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem } from "./types";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({
      category,
      sortBy,
      order,
      currentPage,
      searchValue,
    }: {
      category: string;
      sortBy: string;
      order: string;
      currentPage: number;
      searchValue: string;
    }) => {
      const { data } = await axios.get<PizzaItem[]>(
        `https://62cc94cda080052930ada9ff.mockapi.io/all?page=${currentPage}&limit=${8}${category}&search=${searchValue}&sortBy=${sortBy}&order=${order}`,
      );
      return data;
    },
  );
  
  