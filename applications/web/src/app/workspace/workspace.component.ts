import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AppState } from "../store/app.model";
import { IIncome } from "./model/income.model";
import { IOutcome } from "./model/outcome.model";
import { Mode, RoutingPath, RoutingService } from "./workspace-routing.service";
import { getIncome, getOutcome } from "./workspace.temp";

import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
    @ViewChild("elWorkspacePanelTabs")
    private _tabs!: ElementRef<HTMLElement>;
    private _activeClassName = "el-btn-active";

    public MODE = Mode;
    public ROUTINGPATH = RoutingPath;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _renderer: Renderer2,
        private _routingService: RoutingService,
        private _store$: Store<AppState>,
    ) {}

    public ngOnInit(): void {
        /*////////////////// TEMP CODE!!! //////////////////*/
        let item = 0;
        let date = Date.now();
        const totalItems = 100;
        const incomes: IIncome[] = [];
        const outcomes: IOutcome[] = [];

        const intervalId = setInterval(() => {
            const income = <any>getIncome(item);
            income.createdAt = new Date(date);
            incomes.push(income);

            const outcome = <any>getOutcome(item);
            outcome.createdAt = new Date(date);
            outcomes.push(outcome);
            date++;
            item++;
            if (item === totalItems) {
                clearInterval(intervalId);
                this._store$.dispatch(
                    fromIncomeActions.addIncomes({ payload: incomes }),
                );
                this._store$.dispatch(
                    fromOutcomeActions.addOutcomes({ payload: outcomes }),
                );
            }
        }, 1);
        /*//////////////////////////////////////////////////*/
    }

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
