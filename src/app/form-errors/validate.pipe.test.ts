import { ValidatePipe } from './validate.pipe';

test('returns an empty message when there are no errors', () => {
  const pipe = new ValidatePipe([]);
  expect(pipe.transform(null)).toBe('');
});

test('returns a message with the error details', () => {
  const pipe = new ValidatePipe([
    {
      custom: (details) => `Validation message with details '${details}'`,
    },
  ]);
  expect(
    pipe.transform({
      custom: 'hello from details',
    })
  ).toBe(`Validation message with details 'hello from details'`);
});

test('returns a default message when the error is not configured', () => {
  const pipe = new ValidatePipe([]);
  expect(
    pipe.transform({
      another: 'hello from details',
    })
  ).toBe(`This field is invalid`);
});
