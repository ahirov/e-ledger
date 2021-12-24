import { Income } from "./model/income.model";
import { Outcome } from "./model/outcome.model";
import * as _ from "lodash";

/*////////////////// TEMP CODE!!! //////////////////*/
export function getIncome(item: number): Income {
    return new Income(
        new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
        new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
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
