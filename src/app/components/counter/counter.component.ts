import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from '../../store/selectors/counter.selectors';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from '../../store/actions/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$: Observable<number>;
  customValue: number = 0;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
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
}
