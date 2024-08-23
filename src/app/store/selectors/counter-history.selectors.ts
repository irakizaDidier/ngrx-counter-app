import { createSelector } from '@ngrx/store';
import { CounterHistoryState } from '../reducers/counter-history.reducer';
import { AppState } from 'src/app/app.module';

export const selectCounterHistoryState = (state: AppState) => state.history;

export const selectCounterHistory = createSelector(
  selectCounterHistoryState,
  (state: CounterHistoryState) => state.history
);

export const selectLastCounterState = createSelector(
  selectCounterHistoryState,
  (state: CounterHistoryState) => state.history[state.history.length - 1] || 0
);
