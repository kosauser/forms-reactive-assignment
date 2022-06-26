git import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    static invalidaProjectName(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test') {
            return { 'invalidaProjectName': true };
        }
        return null;
    }
}