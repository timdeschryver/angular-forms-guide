import {
  Directive,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewContainerRef,
  Optional,
} from '@angular/core';
import { NgControl, NgForm, NgModelGroup } from '@angular/forms';
import { ControlErrorComponent } from './control-error.component';
import { FormFieldDirective } from './form-field.directive';

@Directive({
  selector: '[ngModel], [ngModelGroup]',
})
export class ErrorDirective implements AfterViewInit {
  constructor(
    readonly componentFactoryResolver: ComponentFactoryResolver,
    readonly viewContainerRef: ViewContainerRef,
    @Optional() readonly ngModel: NgControl,
    @Optional() readonly ngModelGroup: NgModelGroup,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly formFieldDirective: FormFieldDirective
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const control = this.ngModel?.control ?? this.ngModelGroup?.control;
      if (control && !this.formFieldDirective) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          ControlErrorComponent
        );
        const errorContainer = this.viewContainerRef.createComponent(
          componentFactory
        );
        errorContainer.instance.control = control;
        errorContainer.instance.form = this.ngForm;
      }
    });
  }
}
