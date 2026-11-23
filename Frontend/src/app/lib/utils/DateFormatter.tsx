import { format } from "date-fns";

export const DATE_FORMAT = 'do MMMM Y';
export const DATE_FORMAT_DATE_PICKER = 'yyyy-MM-dd';

export function formatDate(dateValue: Date ) {
  if (!dateValue) {
    return format(new Date(), DATE_FORMAT);
  }
  return format(new Date(dateValue), DATE_FORMAT);
}

export function formatDatePicker(dateValue: Date) {
  if (!dateValue) {
    return format(new Date(), DATE_FORMAT_DATE_PICKER);
  }
  return format(new Date(dateValue), DATE_FORMAT_DATE_PICKER);
}