import { Component } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

import { IIncome } from "../../data/model/income.model";
import { IOutcome } from "../../data/model/outcome.model";
import { ModeService } from "../../workspace-mode.service";

import { selectors } from "../store/state.selectors";
import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";

@Component({
    selector: "el-content",
    templateUrl: "./content.component.html",
})
export class ContentComponent {
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
        return selectors.income.pageItems;
    }

    public get incomePageSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.income.page;
    }

    public get incomeCountSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.income.pagesCount;
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
        return selectors.outcome.pageItems;
    }

    public get outcomePageSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.outcome.page;
    }

    public get outcomeCountSelector(): MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    > {
        return selectors.outcome.pagesCount;
    }

    constructor(private _modeService: ModeService) {}

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }
}
