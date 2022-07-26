import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AuthRequest } from "./model/request.model";
import { AuthErrorService } from "./auth-error.service";
import { authAnimations } from "./auth.animations";

import { environment } from "../../environments/environment";
import { selectors } from "./store/auth.selectors";
import * as fromActions from "../auth/store/auth.actions";

@Component({
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    animations: authAnimations,
})
export class AuthComponent implements OnInit, OnDestroy {
    private _extraError: string | null = null;
    private _storeSub!: Subscription;

    public formSubmitted!: boolean;
    public isSignUpMode = false;
    public passwordMinLength = environment.passwordMinLength;

    constructor(
        private _errorService: AuthErrorService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this._storeSub = this._store$
            .select(selectors.error)
            .subscribe(error => {
                if (error) {
                    this._extraError = error;
                }
            });
    }

    public ngOnDestroy(): void {
        if (this._storeSub) {
            this._storeSub.unsubscribe();
        }
    }

    public onAuthSignUpChange(event: Event): void {
        const target = event.target as HTMLInputElement | null;
        if (target?.checked) {
            this.isSignUpMode = true;
        } else {
            this.isSignUpMode = false;
        }
        this.clearExtraError();
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (form.valid) {
            const request = new AuthRequest(
                form.value.email,
                form.value.password,
            );
            if (this.isSignUpMode) {
                this._store$.dispatch(new fromActions.SignupStart(request));
            } else {
                this._store$.dispatch(new fromActions.LoginStart(request));
            }
            form.reset();
            this.formSubmitted = false;
        }
    }

    public onFocus(): void {
        this.clearExtraError();
    }

    public getErrorMessages(form: NgForm): string[] {
        return this._errorService.getErrorMessages(form, this._extraError);
    }

    private clearExtraError(): void {
        if (this._extraError) {
            this._extraError = null;
        }
    }
}
