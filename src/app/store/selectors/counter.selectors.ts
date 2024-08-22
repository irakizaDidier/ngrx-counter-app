import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCounterState = createFeatureSelector<number>('count');
export const selectCount = createSelector(
  selectCounterState,
  (state: number) => state
);
