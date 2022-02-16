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

import { IIncomeData } from "./data/model/income.model";
import { IOutcomeData } from "./data/model/outcome.model";
import { Source } from "./adjustment/model/income.model";
import { Category } from "./adjustment/model/outcome.model";
import { Mode, RoutingPath, RoutingService } from "./workspace-routing.service";
import { getIncome, getOutcome } from "./workspace.temp";

import "../shared/extensions/number.extensions";
import "../shared/extensions/date.extensions";
import * as fromIncomeActions from "./data/store/income.actions";
import * as fromOutcomeActions from "./data/store/outcome.actions";
import * as fromActions from "./adjustment/store/adjustment.actions";

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
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        /*////////////////// TEMP CODE!!! //////////////////*/
        let item = 0;
        let date = Date.now();
        const totalItems = 100;
        const incomes: IIncomeData[] = [];
        const outcomes: IOutcomeData[] = [];

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
        const sources = [
            new Source(1, "Job"),
            new Source(2, "Deposit"),
            new Source(3, "Stolen"),
            new Source(4, "Business"),
            new Source(5, "Job2"),
            new Source(6, "Job3"),
            new Source(7, "Job4"),
            new Source(8, "Job5"),
            new Source(9, "Robbery"),
        ];
        const categories = [new Category(1, "Food"), new Category(2, "Sport")];
        this._store$.dispatch(
            fromActions.save({ payload: { sources, categories } }),
        );
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
