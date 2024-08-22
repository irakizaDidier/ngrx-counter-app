import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { counterReducer } from './store/reducers/counter.reducer';

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
