import { AbstractControl } from '@angular/forms';

export class Validation {

  static passwordStrength(control: AbstractControl) {
    if (Validation.isEmptyValue(control.value)) {
      return { 'emptyPassword': true };
    }
    if (!control.value.match(/^(?=.*[A-Z])[a-zA-Z0-9!@#\$ %\^&\*]{5,50}$/)) {
      return { 'weakPassword': true };
    }
    return null;
  }

  static emailValid(control: AbstractControl) {
    if (Validation.isEmptyValue(control.value)) {
      return { 'emptyEmail': true };
    }
    if (!control.value.match(/^([A-Za-z0-9-_\+\.]*[a-z0-9])@([-a-z0-9\.]*[a-z0-9]){2,10}$/)) {
      return { 'wrongEmail': true };
    }
    return null;
  }

  static isEmptyValue(value) {
    return value == null ||
      typeof value === 'string' && value.length === 0;
  }
}