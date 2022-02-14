import { IIncomeData, IncomeData } from "./data/model/income.model";
import { IOutcomeData, OutcomeData } from "./data/model/outcome.model";

import { addDays } from "date-fns";
import * as _ from "lodash";

/*////////////////// TEMP CODE!!! //////////////////*/
export function getIncome(item: number): IIncomeData {
    const startDate = new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28));
    const endDate = addDays(startDate, _.random(0, 5000))
    return new IncomeData(
        startDate,
        endDate,
        item,
        _.random(1, 9),
    );
}

export function getOutcome(item: number): IOutcomeData {
    return new OutcomeData(
        new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
        item,
        _.random(1, 2),
        _.random() === 1 ? "test" : "",
    );
}
/*//////////////////////////////////////////////////*/
