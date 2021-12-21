import { Income } from "./model/income.model";
import { Outcome } from "./model/outcome.model";
import * as _ from "lodash";

/*////////////////// TEMP CODE!!! //////////////////*/
export const tempIncomes = getIncomes(100);

function getIncomes(items: number): Income[] {
    const range = _.range(items);
    return _.map(
        range,
        (item) =>
            new Income(
                new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
                new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
                _.random(1, 2),
                item
            ),
    );
}

export const tempOutcomes = getOutcomes(100);

function getOutcomes(items: number): Outcome[] {
    const range = _.range(items);
    return _.map(
        range,
        (item) =>
            new Outcome(
                new Date(_.random(1950, 2020), _.random(0, 11), _.random(1, 28)),
                _.random(1, 2),
                item,
                _.random() === 1 ? "test" : ""
            ),
    );
}
/*//////////////////////////////////////////////////*/
