import { ValidatorFn, AbstractControl } from '@angular/forms';

function isValidNip(nip: string): boolean {
    if (nip.length !== 10) {
        return false;
    }

    const weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    const controlNumber = parseInt(nip.substring(9, 10), 10);
    const weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
        sum += (parseInt(nip.substr(i, 1), 10) * weight[i]);
    }

    return sum % 11 === controlNumber;
}

export function NipValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const isValid = isValidNip(control.value);
        return !isValid ? { nipValid: true } : null;
      };
}
