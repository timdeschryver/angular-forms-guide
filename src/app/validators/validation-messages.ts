import { InjectionToken } from '@angular/core';

export interface ValidationMessages {
  [errorKey: string]: (...errorDetails: any[]) => string;
}
export const VALIDATION_MESSAGES = new InjectionToken<ValidationMessages>(
  'VALIDATION_MESSAGES'
);
