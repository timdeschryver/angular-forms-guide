import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { ErrorsComponent, ErrorsModule } from './errors.component';

it('shows all error messages', async () => {
  await render(ErrorsComponent, {
    imports: [ErrorsModule],
    excludeComponentDeclaration: true,
  });

  const submitForm = () =>
    userEvent.click(
      screen.getByRole('button', {
        name: /submit form/i,
      })
    );

  submitForm();

  await waitFor(() => {
    const messages = screen.getAllByRole('alert').map((x) => x.innerHTML);
    expect(messages).toHaveLength(3);
    expect(messages.some((msg) => /required/i.test(msg))).toBeTruthy();
    expect(messages.some((msg) => /at least/i.test(msg))).toBeTruthy();
  });
});

it('email', async () => {
  await render(ErrorsComponent, {
    imports: [ErrorsModule],
    excludeComponentDeclaration: true,
  });

  const emailField = within(screen.getByTestId('email-field'));
  const email = emailField.getByRole('textbox');
  const message = await emailField.findByRole('alert');
  waitFor(() => expect(message).not.toBeVisible());

  fireEvent.blur(email);
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/This field is required/i);

  userEvent.type(email, 'not an email');
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/This field must be a valid email/i);

  userEvent.type(email, 'example@foo.com');
  expect(message).not.toBeVisible();
});
