import { Injectable } from "@angular/core";
import { AbstractControl, NgForm } from "@angular/forms";

@Injectable()
export class AuthErrorService {
    private _controlsScheme: { [key: string]: string } = {
        email: "Email",
        password: "Password",
        passwordConfirm: "Password confirm",
    };

    public getMessages(form: NgForm, extraMessage?: string): string[] {
        const messages: string[] = [];
        Object.keys(form.controls).forEach(control => {
            this.getValidationMessages(control, form.controls[control]).forEach(
                message => messages.push(message),
            );
        });
        if (extraMessage) {
            messages.push(extraMessage);
        }
        return messages;
    }

    private getValidationMessages(
        control: string,
        value: AbstractControl,
    ): string[] {
        const messages: string[] = [];
        if (value.touched && value.invalid && value.errors) {
            const fieldName =
                control in this._controlsScheme
                    ? this._controlsScheme[control]
                    : "";
            Object.keys(value.errors).forEach(error => {
                const message = this.getValidationMessage(error, fieldName);
                if (message) {
                    messages.push(message);
                }
            });
        }
        return messages;
    }

    private getValidationMessage(error: string, name: string): string | null {
        switch (error) {
            case "required":
                return `${name} field is required!`;
            case "email":
                return "Email is invalid!";
            default:
                return null;
        }
    }
}
