import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=text][ngModel][typeaheadItems]',
  host: {
    '(input)': 'inputInputted($event)',
    '(focus)': 'inputFocussed($event)',
    '(blur)': 'inputBlurred($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TypeaheadDirective,
    },
  ],
})
export class TypeaheadDirective implements ControlValueAccessor {
  @Input() typeaheadItems?: { value: any; label: string }[];

  selectedItem: { value: any; label: string } | null = null;

  onChange = (_: any) => {};
  onTouched = () => {};

  factory = this.componentFactoryResolver.resolveComponentFactory(
    TypeaheadItemsComponent
  );
  menuItemsRef?: ComponentRef<TypeaheadItemsComponent>;

  constructor(
    readonly elementRef: ElementRef,
    readonly componentFactoryResolver: ComponentFactoryResolver,
    readonly viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('document:click', ['$event'])
  documentClicked(event: MouseEvent) {
    if (event.target !== this.elementRef.nativeElement) {
      this.menuItemsRef?.instance.itemSelected.unsubscribe();
      this.menuItemsRef?.destroy();
      if (!this.selectedItem) {
        this.writeValue(null);
      }
    }
  }

  inputInputted(event: Event) {
    this.populateItems((event.target as HTMLInputElement).value);
    this.onChange(null);
    this.selectedItem = null;
  }

  inputFocussed(event: Event) {
    this.menuItemsRef = this.viewContainerRef.createComponent(this.factory);
    this.populateItems((event.target as HTMLInputElement).value);
    this.menuItemsRef.instance.itemSelected.subscribe({
      next: (value: { value: any; label: string }) => this.itemClicked(value),
    });
  }

  inputBlurred() {
    this.onTouched();
  }

  itemClicked(item: { value: any; label: string }) {
    this.onChange(item.value);
    this.writeValue(item);
  }

  writeValue(obj: any): void {
    // update the value of the input element when the model's value changes
    this.elementRef.nativeElement.value = obj && obj.label ? obj.label : '';
    this.selectedItem = obj;
  }

  registerOnChange(fn: any): void {
    // register the `onChange` hook to update the value of the model
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // register the `onTouched` hook to mark when the element has been touched
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // disable the native element when the form or control is disabled
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private populateItems(value: string) {
    if (this.menuItemsRef) {
      this.menuItemsRef.instance.data =
        this.typeaheadItems?.filter((v) => v.label.includes(value)) || [];
    }
  }
}

@Component({
  selector: 'app-typeahead',
  template: `
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        #input
        type="text"
        (input)="inputInputted($event)"
        (blur)="inputBlurred()"
        (focus)="inputFocussed()"
        class="px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
      />
      <app-typeahead-items
        [data]="filteredData"
        (itemSelected)="itemClicked($event)"
        *ngIf="showSearchItems"
        style="margin-top: 3rem;"
      ></app-typeahead-items>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TypeaheadComponent,
    },
  ],
})
export class TypeaheadComponent implements ControlValueAccessor {
  @ViewChild('input') input!: ElementRef;
  @Input() typeaheadItems?: { value: any; label: string }[];

  showSearchItems = false;
  filteredData: { value: any; label: string }[] = [];
  selectedItem: { value: any; label: string } | null = null;

  onChange = (_: any) => {};
  onTouched = () => {};

  @HostListener('document:click', ['$event'])
  documentClicked(event: MouseEvent) {
    if (event.target !== this.input.nativeElement) {
      this.showSearchItems = false;
      if (!this.selectedItem) {
        this.writeValue(null);
      }
    }
  }

  inputInputted(event: Event) {
    this.updateFilteredData((event.target as HTMLInputElement).value);
    this.onChange(null);
    this.selectedItem = null;
  }

  inputFocussed() {
    this.showSearchItems = true;
    this.updateFilteredData(this.input.nativeElement.value);
  }

  inputBlurred() {
    this.onTouched();
  }

  itemClicked(item: { value: any; label: string }) {
    this.onChange(item.value);
    this.writeValue(item);
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj && obj.label ? obj.label : '';
    this.selectedItem = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.input.nativeElement.disabled = isDisabled;
  }

  private updateFilteredData(value: string) {
    this.filteredData =
      this.typeaheadItems?.filter((v) => v.label.includes(value)) || [];
  }
}

@Component({
  selector: 'app-typeahead-items',
  template: `
    <div class="w-64 bg-white border rounded-md shadow-md" role="menu">
      <ul class="flex flex-col w-full">
        <li
          *ngFor="let item of data"
          (click)="itemSelected.emit(item)"
          class="px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none cursor-pointer"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        margin-top: 0.25rem;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    `,
  ],
})
export class TypeaheadItemsComponent {
  @Input() data: { value: any; label: string }[] = [];
  @Output() itemSelected = new EventEmitter<{ value: any; label: string }>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    TypeaheadComponent,
    TypeaheadDirective,
    TypeaheadItemsComponent,
  ],
  exports: [TypeaheadComponent, TypeaheadDirective],
  // just for stackblitz
  entryComponents: [TypeaheadItemsComponent],
})
export class TypeaheadModule {}
