import { createReducer, on, Action } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from '../actions/counter.actions';

export interface CounterState {
  count: number;
}

export const initialCounterState: CounterState = {
  count: 0,
};

const _counterReducer = createReducer(
  initialCounterState,
  on(increment, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(decrement, (state) => {
    if (state.count <= 0) {
      return state;
    }
    return {
      ...state,
      count: state.count - 1,
    };
  }),
  on(reset, (state) => ({
    ...state,
    count: 0,
  })),
  on(incrementByAmount, (state, { amount }) => ({
    ...state,
    count: state.count + amount,
  })),
  on(decrementByAmount, (state, { amount }) => {
    if (state.count < amount) {
      return state;
    }
    return {
      ...state,
      count: state.count - amount,
    };
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
