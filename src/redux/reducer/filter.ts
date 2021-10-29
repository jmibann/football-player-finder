import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index';


type FilterStateType = {
  params: {
    age: number | string;
    name: string;
    position: string;
    isSearchingActive: boolean;
  }
}

const initialState: FilterStateType = {
  params: {
    age: 0,
    name: '',
    position: '',
    isSearchingActive: false,
  }
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setFilterParams:
      (state, action: PayloadAction<FilterStateType>) => {

        const { name, age, position } = action.payload.params;
        const byAge = Boolean(age);
        const byName = Boolean(name.length);
        const byPosition = Boolean(position.length);

        const isSearchingActive = byName || byPosition || byAge;

        state.params = action.payload.params;
        state.params.isSearchingActive = isSearchingActive;
      },
  },
});

export const { setFilterParams } = filterSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filterSlice.reducer;
