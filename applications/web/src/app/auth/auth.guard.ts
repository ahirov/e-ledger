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
import { selectors } from "./store/auth.selectors";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private _store$: Store,
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
        return this._store$.select(selectors.user).pipe(
            take(1),
            map(user => {
                return user ? true : this._router.createUrlTree(["/auth"]);
            }),
        );
    }
}
