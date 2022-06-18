import {createSlice} from '@reduxjs/toolkit';

const fuelSlice = createSlice({
  name: 'fuel',
  initialState: {
    userAllowance: 0,
    fuelStore: [],
    userConsumptionList: [],
  },
  reducers: {
    initDatabase(state, action) {
      state.fuelStore = action.payload.fuelStore;
      state.userAllowance = action.payload.userMaxAllowance;
    },
    addConsumption(state, action) {
      state.userAllowance -= action.payload.usedAmount;
      state.userConsumptionList.push(action.payload);
    },
    deleteConsumption(state, action) {
      const deleteItem = state.userConsumptionList.find(
        item => item.id === action.payload,
      );
      state.userAllowance += deleteItem.usedAmount;
      state.userConsumptionList = state.userConsumptionList.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const fuelActions = fuelSlice.actions;
export default fuelSlice;
