import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlErrorComponent } from './control-error.component';
import { ErrorDirective } from './error.directive';
import { FormFieldDirective } from './form-field.directive';
import { ValidateModule } from '../validate';

@NgModule({
  imports: [CommonModule, ValidateModule],
  declarations: [FormFieldDirective, ErrorDirective, ControlErrorComponent],
  exports: [FormFieldDirective, ErrorDirective, ControlErrorComponent],
})
export class FormErrorsModule {}
