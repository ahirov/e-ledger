import {
    AfterViewInit,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";

import { Mode, RoutingPath, RoutingService } from "./workspace-routing.service";
import * as fromActions from "../auth/store/auth.actions";
import * as fromApp from "../store/app.state";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent implements AfterViewInit {
    @ViewChild("elWorkspacePanelTabs")
    private _tabs!: ElementRef<HTMLElement>;
    private _activeClassName = "el-btn-active";

    public routingPath = RoutingPath;
    public mode = Mode;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _renderer: Renderer2,
        private _routingService: RoutingService,
        private _store$: Store<fromApp.AppState>,
    ) {}

    public ngAfterViewInit(): void {
        const buttons = this.getAllButtons();
        this.activateButton(buttons[0], RoutingPath.Cashflow);
    }

    public onTabClick(event: Event, path: RoutingPath, mode?: Mode): void {
        const buttons = this.getAllButtons();
        buttons.forEach((button: HTMLButtonElement) => {
            this._renderer.removeClass(button, this._activeClassName);
        });

        const target = event.currentTarget as HTMLButtonElement | null;
        if (target) {
            this.activateButton(target, path, mode);
        }
    }

    public onLogout(): void {
        this._store$.dispatch(new fromActions.Logout());
    }

    private getAllButtons(): NodeListOf<HTMLButtonElement> {
        return this._tabs.nativeElement.querySelectorAll<HTMLButtonElement>(
            "button",
        ) as NodeListOf<HTMLButtonElement>;
    }

    private activateButton(
        button: HTMLButtonElement,
        path: RoutingPath,
        mode?: Mode,
    ): void {
        this._renderer.addClass(button, this._activeClassName);

        const commands = this._routingService.hasSavedMode(path)
            ? [path, this._routingService.savedMode]
            : mode
                ? [path, mode]
                : [path];
        this._router.navigate(commands, { relativeTo: this._route });
    }
}
