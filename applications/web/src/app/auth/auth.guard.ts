import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AppState } from "../store/app.model";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private _store$: Store<AppState>,
        private _router: Router,
    ) {}

    public canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this._store$.select("auth").pipe(
            take(1),
            map(state => {
                return state.user ? true : this._router.createUrlTree(["/auth"]);
            }),
        );
    }
}
