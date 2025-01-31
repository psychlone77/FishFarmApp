export function isDatePassed(stringDate : string | Date) : boolean {
  return new Date(stringDate) > new Date();
}