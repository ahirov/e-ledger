import {
    AfterViewInit,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.state";
import * as fromActions from "../auth/store/auth.actions";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent implements AfterViewInit {
    @ViewChild("elWorkspacePanelTabs")
    private tabs: ElementRef<HTMLElement> | null = null;
    private activeClassName = "el-btn-active";

    constructor(
        private _store$: Store<fromApp.AppState>,
        private renderer: Renderer2,
    ) {}

    public ngAfterViewInit(): void {
        const buttons = this.getAllButtons();
        this.renderer.addClass(buttons[0], this.activeClassName);
    }

    public onTabClick(event: Event) {
        const buttons = this.getAllButtons();
        buttons.forEach((button: HTMLButtonElement) => {
            this.renderer.removeClass(button, this.activeClassName);
        });

        const target = event.currentTarget as HTMLButtonElement | null;
        if (target) {
            this.renderer.addClass(target, this.activeClassName);
        }
    }

    public onLogout(): void {
        this._store$.dispatch(new fromActions.Logout());
    }

    private getAllButtons(): NodeListOf<HTMLButtonElement> {
        return this.tabs?.nativeElement.querySelectorAll<HTMLButtonElement>(
            "button",
        ) as NodeListOf<HTMLButtonElement>;
    }
}
