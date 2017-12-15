import { FormControl } from "@angular/forms";

export function ValidateField(input: FormControl) {
    return input.valid || input.untouched
}
