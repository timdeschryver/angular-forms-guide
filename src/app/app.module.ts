import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputTypesModule } from './01-input-types/input-types.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, InputTypesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
