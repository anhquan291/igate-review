import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSelector, OutputSelector } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../Store/Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
