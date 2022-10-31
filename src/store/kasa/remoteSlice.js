import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  remotes: [],
  remotesLoaded: false,
  remoteIndexList: [],
  selectedIndex: null,
};

const remoteSlice = createSlice({
  name: 'remote',
  initialState,
  reducers: {
    remotesFetching(state) {
      state.remotesLoaded = false;
    },
    remotesFetched(state, { payload }) {
      state.remotesLoaded = false;
      state.remotes = payload;
    },
    setRemoteIndexList(state, { payload }) {
      state.remoteIndexList = payload;
    },
    setSelectedIndex(state, { payload }) {
      state.selectedIndex = payload;
    },
  },
});

export const {
  remotesFetched,
  remotesFetching,
  setRemoteIndexList,
  setSelectedIndex,
} = remoteSlice.actions;

export default remoteSlice.reducer;
