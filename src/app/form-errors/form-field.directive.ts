import {
  Directive,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewContainerRef,
  Optional,
  ContentChild,
  ElementRef,
} from '@angular/core';
import { AbstractControl, NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { ControlErrorComponent } from './control-error.component';

@Directive({
  selector: '[formField]',
})
export class FormFieldDirective implements AfterViewInit {
  @ContentChild(NgModel) ngModelChild?: NgModel;
  @ContentChild(NgModelGroup) ngModelGroupChild?: NgModelGroup;

  constructor(
    private element: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Optional() private ngModelGroup: NgModelGroup,
    @Optional() private ngForm: NgForm
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.addErrorContainer(this.ngModelGroup?.control);
      this.addErrorContainer(this.ngModelChild?.control);
      this.addErrorContainer(this.ngModelGroupChild?.control);
    });
  }

  private addErrorContainer(control?: AbstractControl) {
    if (control) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ControlErrorComponent
      );

      const errorContainer = this.viewContainerRef.createComponent(
        componentFactory
      );

      const host = this.element.nativeElement as HTMLElement;
      host.style.flexWrap = 'wrap';
      host.appendChild(errorContainer.location.nativeElement);

      errorContainer.instance.control = control;
      errorContainer.instance.form = this.ngForm;
    }
  }
}
