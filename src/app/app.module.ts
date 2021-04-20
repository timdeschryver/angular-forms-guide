import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { InputTypesModule } from './01-input-types/input-types.component';
import { ValidationModule } from './02-validation/validation.component';
import { ErrorsModule } from './03-errors/errors.component';
import { DynamicModule } from './04-dynamic/dynamic.component';
import { SubFormComponentsModule } from './05-sub-form-components/team.component';
import { WizardModule } from './06-wizard/wizard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    InputTypesModule,
    ValidationModule,
    ErrorsModule,
    DynamicModule,
    SubFormComponentsModule,
    WizardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
