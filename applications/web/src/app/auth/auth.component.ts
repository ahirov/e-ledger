import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";

import { AuthCredentials } from "./auth.model";
import { AuthErrorService } from "./auth-error.service";
import { AuthAnimations } from "./auth.animations";
import * as fromApp from "../store/app.state";
import * as fromActions from "../auth/store/auth.actions";

@Component({
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    animations: AuthAnimations,
})
export class AuthComponent implements OnInit, OnDestroy {
    private _extraError: { message: string; isExternal: boolean } | null = null;
    private _storeSub!: Subscription;

    public isSignUpMode = false;

    constructor(
        private _store$: Store<fromApp.AppState>,
        private _errorService: AuthErrorService,
    ) {}

    public ngOnInit(): void {
        this._storeSub = this._store$.select("auth").subscribe(state => {
            if (state.error) {
                this._extraError = { message: state.error, isExternal: true };
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
        if (form.valid) {
            const email    = form.value.email;
            const password = form.value.password;
            if (this.isSignUpMode) {
                const passwordConfirm = form.value.passwordConfirm;
                if (password === passwordConfirm) {
                    this._store$.dispatch(
                        new fromActions.SignupStart(
                            new AuthCredentials(email, password),
                        ),
                    );
                    form.reset();
                } else {
                    this._extraError = {
                        message: "Passwords do not match!",
                        isExternal: false,
                    };
                }
            } else {
                this._store$.dispatch(
                    new fromActions.LoginStart(
                        new AuthCredentials(email, password),
                    ),
                );
                form.reset();
            }
        }
    }

    public onFocus(): void {
        this.clearExtraError();
    }

    public getErrorMessages(form: NgForm): string[] {
        return this._errorService.getMessages(form, this._extraError?.message);
    }

    private clearExtraError(): void {
        if (this._extraError) {
            if (this._extraError.isExternal) {
                this._store$.dispatch(new fromActions.ClearError());
            }
            this._extraError = null;
        }
    }
}
