import { Action, createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from '../actions/counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, () => 0),
  on(incrementByAmount, (state, { amount }) => state + amount),
  on(decrementByAmount, (state, { amount }) => state - amount)
);

export function counterReducer(state: number | undefined, action: Action) {
  return _counterReducer(state, action);
}
