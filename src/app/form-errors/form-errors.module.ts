import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlErrorComponent } from './control-error.component';
import { ErrorDirective } from './error.directive';
import { FormFieldDirective } from './form-field.directive';
import { ValidatePipe } from './validate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormFieldDirective,
    ErrorDirective,
    ControlErrorComponent,
    ValidatePipe,
  ],
  exports: [
    FormFieldDirective,
    ErrorDirective,
    ControlErrorComponent,
    ValidatePipe,
  ],
})
export class FormErrorsModule {}
