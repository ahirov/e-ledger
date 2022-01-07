import { Component, Input } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

import { IIncome } from "../model/income.model";
import { IOutcome } from "../model/outcome.model";
import { Mode } from "../workspace-routing.service";
import { appSelectors as selectors } from "../../store/app.state";

import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";
import * as _ from "lodash";

@Component({
    selector: "el-list-pagination",
    templateUrl: "./list-pagination.component.html",
})
export class ListPaginationComponent {
    @Input()
    public mode!: Mode;
    public MODE = Mode;

    public get incomeAction(): (props: { payload: number }) => {
        payload: number;
    } & TypedAction<any> {
        return fromIncomeActions.selectPage;
    }

    public get incomesSelector(): MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    > {
        return selectors.income.summaryPageItems;
    }

    public get incomePageSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.income.summaryActivePage;
    }

    public get incomeCountSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.income.summaryPagesCount;
    }

    public get outcomeAction(): (props: { payload: number }) => {
        payload: number;
    } & TypedAction<any> {
        return fromOutcomeActions.selectPage;
    }

    public get outcomesSelector(): MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    > {
        return selectors.outcome.summaryPageItems;
    }

    public get outcomePageSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.outcome.summaryActivePage;
    }

    public get outcomeCountSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.outcome.summaryPagesCount;
    }
}
