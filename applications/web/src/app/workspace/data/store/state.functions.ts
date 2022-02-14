import { Dictionary } from "@ngrx/entity";
import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import { IIncome, IIncomeData, Income } from "../model/income.model";
import { IOutcome, IOutcomeData, Outcome } from "../model/outcome.model";
import * as _ from "lodash";

export function getIncomes(
    ids: string[],
    sources: ISource[],
    incomes: Dictionary<IIncomeData>,
): IIncome[] {
    const items: IIncome[] = [];
    for (const id of ids) {
        const income = incomes[id];
        if (income) {
            const source = _.find(
                sources,
                currentSource => currentSource.id === income.sourceId,
            );
            if (source) {
                items.push(
                    new Income(
                        income.id,
                        income.created,
                        income.from,
                        income.to,
                        income.sum,
                        income.sumPerDay,
                        { ...source },
                    ),
                );
            }
        }
    }
    return items;
}

export function getOutcomes(
    ids: string[],
    categories: ICategory[],
    outcomes: Dictionary<IOutcomeData>,
): IOutcome[] {
    const items: IOutcome[] = [];
    for (const id of ids) {
        const outcome = outcomes[id];
        if (outcome) {
            const category = _.find(
                categories,
                currentCategory => currentCategory.id === outcome.categoryId,
            );
            if (category) {
                items.push(
                    new Outcome(
                        outcome.id,
                        outcome.created,
                        outcome.date,
                        outcome.sum,
                        outcome.description,
                        { ...category },
                    ),
                );
            }
        }
    }
    return items;
}
