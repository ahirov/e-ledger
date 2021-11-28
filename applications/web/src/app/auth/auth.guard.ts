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

import * as fromApp from "../store/app.state";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private _store$: Store<fromApp.AppState>,
        private _router: Router,
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
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
