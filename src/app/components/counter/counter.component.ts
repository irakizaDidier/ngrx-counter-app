import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastCounterState } from '../../store/selectors/counter.selectors';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
  undo,
} from '../../store/actions/counter.actions';
import { selectCounterHistory } from '../../store/selectors/counter-history.selectors';
import { AppState } from 'src/app/app.module';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$: Observable<number>;
  history$: Observable<number[]>;
  customValue: number = 0;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectLastCounterState);
    this.history$ = this.store.select(selectCounterHistory);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementByAmount() {
    this.store.dispatch(incrementByAmount({ amount: this.customValue }));
  }

  decrementByAmount() {
    this.store.dispatch(decrementByAmount({ amount: this.customValue }));
  }

  undo() {
    this.store.dispatch(undo());
  }
}
