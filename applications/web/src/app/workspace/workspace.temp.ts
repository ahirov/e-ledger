import { Income } from "./model/income.model";
import { Outcome } from "./model/outcome.model";

import { addDays } from "date-fns";
import * as _ from "lodash";

/*////////////////// TEMP CODE!!! //////////////////*/
export function getIncome(item: number): Income {
    const startDate = new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28));
    const endDate = addDays(startDate, _.random(0, 5000))
    return new Income(
        startDate,
        endDate,
        _.random(1, 2),
        item,
    );
}

export function getOutcome(item: number): Outcome {
    return new Outcome(
        new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
        _.random(1, 2),
        item,
        _.random() === 1 ? "test" : "",
    );
}
/*//////////////////////////////////////////////////*/
