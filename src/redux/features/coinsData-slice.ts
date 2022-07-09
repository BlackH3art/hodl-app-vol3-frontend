import { createSlice } from "@reduxjs/toolkit";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";


interface SetCoinsData {
  payload: CoinDataInterface[];
}

interface InitialState {
  coinsData: CoinDataInterface[];
}

const initialState: InitialState = {
  coinsData: []
}

export const coinsDataSlice = createSlice({
  name: "coinsData",
  initialState,
  reducers: {
    setCoinsData: (state, action: SetCoinsData) => {
      state.coinsData = action.payload;
    },
  }
});


export const { setCoinsData } = coinsDataSlice.actions;