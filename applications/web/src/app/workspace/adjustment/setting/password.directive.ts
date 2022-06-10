import { Directive, Input } from "@angular/core";
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from "@angular/forms";

@Directive({
    selector: "[passwordsIdentical]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true },
    ],
})
export class PasswordDirective implements Validator {
    @Input("passwordsIdentical")
    public targetName = "";

    public validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value) {
            const target = control.root.get(this.targetName);
            return target ? this.processTarget(target, value) : null;
        } else {
            return { error: "required" };
        }
    }

    private processTarget(
        target: AbstractControl,
        value: string,
    ): ValidationErrors | null {
        if (value === target.value) {
            target.setErrors(null);
        } else {
            const notEqual = { error: "not equal" };
            if (this.targetName !== "password") {
                target.setErrors(notEqual);
            } else {
                return { ...notEqual };
            }
        }
        return null;
    }
}
