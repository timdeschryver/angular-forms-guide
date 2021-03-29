import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { InputTypesComponent, InputTypesModule } from './input-types.component';

it('builds up the form model', async () => {
  const submitEmitter = jest.fn();
  await render(InputTypesComponent, {
    template:
      '<app-input-types (submitEmitter)="submitEmitter($event)"></app-input-types>',
    componentProperties: {
      submitEmitter,
    },
    imports: [InputTypesModule],
  });

  userEvent.type(screen.getByRole('textbox', { name: /text/i }), 'Some text');

  userEvent.type(screen.getByRole('spinbutton', { name: /number/i }), '6');

  userEvent.selectOptions(
    screen.getByRole('combobox', {
      name: /select/i,
    }),
    screen.getByRole('option', { name: /option two/i })
  );

  userEvent.click(
    screen.getByRole('checkbox', {
      name: /check one/i,
    })
  );
  userEvent.click(
    screen.getByRole('checkbox', {
      name: /check three/i,
    })
  );

  userEvent.click(
    screen.getByRole('radio', {
      name: /radio three/i,
    })
  );

  userEvent.click(
    screen.getByRole('button', {
      name: /submit form/i,
    })
  );

  expect(submitEmitter).toHaveBeenCalledWith({
    text: 'Some text',
    number: 6,
    select: '2',
    checks: [
      { id: 'check-one', label: 'Check One', selected: true },
      { id: 'check-two', label: 'Check Two', selected: false },
      { id: 'check-three', label: 'Check Three', selected: true },
    ],
    radio: 3,
  });
});
