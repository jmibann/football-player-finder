import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index';


type FilterStateType = {
  params: {
    age: number | string;
    name: string;
    position: string;
  }
}

const initialState: FilterStateType = {
  params: {
    age: 0,
    name: '',
    position: '',
  }
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setFilterParams:
      (state, action: PayloadAction<FilterStateType>) => {
        state.params = action.payload.params;
      },
  },
});

export const { setFilterParams } = filterSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filterSlice.reducer;
