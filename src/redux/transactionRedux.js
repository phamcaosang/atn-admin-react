import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getTransactionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTransactionSuccess: (state, action) => {
      state.isFetching = false;
      state.transactions = action.payload;
    },
    getTransactionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteTransactionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTransactionSuccess: (state, action) => {
      state.isFetching = false;
      state.transactions.splice(
        state.transactions.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteTransactionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateTransactionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTransactionSuccess: (state, action) => {
      state.isFetching = false;
      state.Transactions[
        state.Transactions.findIndex((item) => item._id === action.payload.id)
      ] = {_id: action.payload.id, ...action.payload.Transaction};
    },
    updateTransactionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addTransactionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTransactionSuccess: (state, action) => {
      state.isFetching = false;
      state.Transactions.push(action.payload);
    },
    addTransactionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getTransactionStart,
  getTransactionSuccess,
  getTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  deleteTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  updateTransactionFailure,
  addTransactionStart,
  addTransactionSuccess,
  addTransactionFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;