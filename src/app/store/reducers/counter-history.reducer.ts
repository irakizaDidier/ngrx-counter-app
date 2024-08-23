import { Action, createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
  undo,
} from '../actions/counter.actions';

export interface CounterHistoryState {
  history: number[];
}

export const initialCounterHistoryState: CounterHistoryState = {
  history: [0],
};

const _counterHistoryReducer = createReducer(
  initialCounterHistoryState,
  on(increment, (state) => ({
    ...state,
    history: [
      ...state.history,
      Math.max(0, state.history[state.history.length - 1] + 1),
    ],
  })),
  on(decrement, (state) => ({
    ...state,
    history: [
      ...state.history,
      Math.max(0, state.history[state.history.length - 1] - 1),
    ],
  })),
  on(reset, (state) => ({
    ...state,
    history: [0],
  })),
  on(incrementByAmount, (state, { amount }) => ({
    ...state,
    history: [
      ...state.history,
      Math.max(0, state.history[state.history.length - 1] + amount),
    ],
  })),
  on(decrementByAmount, (state, { amount }) => ({
    ...state,
    history: [
      ...state.history,
      Math.max(0, state.history[state.history.length - 1] - amount),
    ],
  })),
  on(undo, (state) => {
    if (state.history.length <= 1) {
      return state;
    }
    const newHistory = state.history.slice(0, -1);
    return {
      ...state,
      history: newHistory,
    };
  })
);

export function counterHistoryReducer(
  state: CounterHistoryState | undefined,
  action: Action
) {
  return _counterHistoryReducer(state, action);
}
