import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { InputTypesModule } from './01-input-types/input-types.component';
import { ValidationModule } from './02-validation/validation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTypesModule,
    ValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
