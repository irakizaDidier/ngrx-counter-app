import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    this.store.dispatch(decrement());
    this.count$
      .pipe(
        tap((count) => {
          if (count === 0) {
            this.toastr.info('Counter cannot be decremented below zero.');
          }
        })
      )
      .subscribe();
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementByAmount() {
    this.store.dispatch(incrementByAmount({ amount: this.customValue }));
  }

  decrementByAmount() {
    this.store.dispatch(decrementByAmount({ amount: this.customValue }));
    this.count$
      .pipe(
        tap((count) => {
          if (count === 0) {
            this.toastr.info('Counter cannot be decremented below zero.');
          }
        })
      )
      .subscribe();
  }

  undo() {
    this.store.dispatch(undo());
  }
}
