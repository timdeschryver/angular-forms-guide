import { Component, Input } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-control-error',
  template: `
    <!-- use 'control.invalid' because the error should also not be visible in the 'pending' state -->
    <div
      role="alert"
      class="mt-1 text-sm text-red-600"
      [hidden]="!control.invalid || !(control.touched || form?.submitted)"
    >
      {{ control.errors | validate }}
    </div>
  `,
  styles: [
    `
      :host {
        margin: 0 !important;
        flex-basis: 100% !important;
      }
    `,
  ],
})
export class ControlErrorComponent {
  @Input() control!: AbstractControl;
  @Input() form?: NgForm;
}
