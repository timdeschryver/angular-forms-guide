import { FormsModule, NgForm } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EqualToValidatorDirective } from './equal-to.validator';

it('is valid when it has the same value as the comparison va', async () => {
  const component = await render(EqualToValidatorDirective, {
    template: `<form><input [equalTo]='compareValue' ngModel name="sut" /></form>`,
    imports: [FormsModule],
    componentProperties: {
      compareValue: 'value1',
    },
  });

  const model = component.fixture.debugElement.children[0].injector.get(NgForm);
  const input = screen.getByRole('textbox');

  userEvent.type(input, 'value2');
  expect(model.controls.sut.invalid).toBeTruthy();
  expect(model.controls.sut.errors).toEqual({
    equalTo: {
      name: undefined,
      value: 'value1',
    },
  });

  userEvent.clear(input);
  userEvent.type(input, 'value1');
  expect(model.controls.sut.valid).toBeTruthy();
  expect(model.controls.sut.errors).toBeNull();
});

it('revalidates on input change', async () => {
  const component = await render(EqualToValidatorDirective, {
    template: `<form><input [equalTo]='compareValue' ngModel name="sut" /></form>`,
    imports: [FormsModule],
    componentProperties: {
      compareValue: 'value1',
    },
  });

  const model = component.fixture.debugElement.children[0].injector.get(NgForm);
  const input = screen.getByRole('textbox');

  userEvent.type(input, 'value2');
  expect(model.controls.sut.invalid).toBeTruthy();
  expect(model.controls.sut.errors).toEqual({
    equalTo: {
      name: undefined,
      value: 'value1',
    },
  });

  component.fixture.componentInstance.compareValue = 'value2';
  expect(model.controls.sut.valid).toBeTruthy();
  expect(model.controls.sut.errors).toBeNull();
});
