// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { counterReducer, CounterState } from './store/reducers/counter.reducer';
import {
  counterHistoryReducer,
  CounterHistoryState,
} from './store/reducers/counter-history.reducer';

export interface AppState {
  count: CounterState;
  history: CounterHistoryState;
}

const reducers = {
  count: counterReducer,
  history: counterHistoryReducer,
};

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot<AppState>(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
