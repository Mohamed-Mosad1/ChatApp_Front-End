import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.parent) {
      return null;
    }

    const matchControl = control.parent.get(matchTo);
    if (!matchControl) {
      return null;
    }

    if (control.pristine || matchControl.pristine) {
      return null;
    }

    return control.value !== matchControl.value ? { isMatching: true } : null;
  };
}
