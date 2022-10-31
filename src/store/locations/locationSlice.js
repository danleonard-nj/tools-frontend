import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [],
  locationsLoading: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations(state, { payload }) {
      state.locationsLoading = false;
      state.locations = payload;
    },
    setLocationsLoading(state, { payload }) {
      state.locationsLoading = payload;
    },
  },
});

export const { setLocations, setLocationsLoading } = locationSlice.actions;

export default locationSlice.reducer;
