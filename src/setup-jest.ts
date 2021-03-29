import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/angular';

configure({
  excludeComponentDeclaration: true,
});
