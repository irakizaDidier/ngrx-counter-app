import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { selectLastCounterState } from '../../store/selectors/counter.selectors';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private store: Store<AppState>, private toastr: ToastrService) {
    this.count$ = this.store.pipe(select(selectLastCounterState));
    this.history$ = this.store.pipe(select(selectCounterHistory));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.count$.pipe(first()).subscribe((count) => {
      if (count > 0) {
        this.store.dispatch(decrement());
      } else {
        this.toastr.info('Counter cannot be decremented below zero.');
      }
    });
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementByAmount() {
    this.store.dispatch(incrementByAmount({ amount: this.customValue }));
  }

  decrementByAmount() {
    this.count$.pipe(first()).subscribe((count) => {
      if (count >= this.customValue) {
        this.store.dispatch(decrementByAmount({ amount: this.customValue }));
      } else {
        this.toastr.info('Counter cannot be decremented below zero.');
      }
    });
  }

  undo() {
    this.store.dispatch(undo());
  }
}
