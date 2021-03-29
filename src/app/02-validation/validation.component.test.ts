import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { UsersService } from './users.service';

import { ValidationComponent, ValidationModule } from './validation.component';

const provideMockedUsersService = () => ({
  provide: UsersService,
  useValue: {
    isUsernameTaken: jest.fn((value) => of(value === 'taken')),
  } as UsersService,
});

it('name is required when checkbox is checked', async () => {
  await render(ValidationComponent, {
    imports: [ValidationModule],
    providers: [provideMockedUsersService()],
  });

  const name = screen.getByRole('textbox', { name: /^name$/i });
  const check = screen.getByRole('checkbox', { name: /make "name" required/i });

  expect(name).toBeValid();

  userEvent.click(check);
  expect(name).toBeInvalid();
});

it('at least one checkbox must be checked to be valid', async () => {
  await render(ValidationComponent, {
    imports: [ValidationModule],
    providers: [provideMockedUsersService()],
  });

  const afternoonCheck = screen.getByRole('checkbox', {
    name: /afternoon/i,
  });
  const timesCheckboxGroup = screen.getByTestId('times');

  userEvent.click(afternoonCheck);
  expect(timesCheckboxGroup).toHaveClass('ng-valid');

  userEvent.click(afternoonCheck);
  expect(timesCheckboxGroup).toHaveClass('ng-invalid');
});

it('passwords must match', async () => {
  await render(ValidationComponent, {
    imports: [ValidationModule],
    providers: [provideMockedUsersService()],
  });

  const password = screen.getByLabelText(/password$/i);
  const confirmation = screen.getByLabelText(/password confirmation/i);

  userEvent.type(password, 'supersecurepassword');
  userEvent.type(confirmation, 'somethingelse');
  expect(confirmation).toHaveClass('ng-invalid');

  userEvent.clear(confirmation);
  userEvent.type(confirmation, 'supersecurepassword');
  expect(confirmation).toHaveClass('ng-valid');
});

it('username must be unique', async () => {
  await render(ValidationComponent, {
    imports: [ValidationModule],
    providers: [provideMockedUsersService()],
  });

  const username = screen.getByRole('textbox', { name: /username/i });

  userEvent.type(username, 'taken');
  fireEvent.blur(username);
  await waitFor(() => expect(username).toHaveClass('ng-invalid'));

  userEvent.clear(username);
  userEvent.type(username, 'not-taken');
  fireEvent.blur(username);
  await waitFor(() => expect(username).toHaveClass('ng-valid'));
});
