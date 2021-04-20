export interface Model {
  firstName: string;
  lastName: string;
  startDate: string | null;
  helpTypes: number[];
  details: HelpDetails[];
}

export interface HelpDetails {
  helpType: HelpType;
  minimumRequiredHours: number | null;
  idealRequiredHours: number | null;
  days: number[];
  notes: string;
}

export interface HelpType {
  description: string;
  value: number;
}

export interface Rate {
  header: string;
  rates: [number, number, number];
}
