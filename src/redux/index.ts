import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { playerSlice } from './reducer';
import type { store, RootState, AppDispatch } from './store'

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type { RootState, AppDispatch };
export {
  store,
  playerSlice,
  useAppDispatch,
  useAppSelector,
};