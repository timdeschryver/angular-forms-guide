import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputTypesModule } from './01-input-types/input-types.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InputTypesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
