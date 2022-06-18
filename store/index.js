import {configureStore} from '@reduxjs/toolkit';

import fuelSlice from './fuel-slice';

const store = configureStore({
  reducer: {fuel: fuelSlice.reducer},
});

export default store;
