import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
    name: "enumToPairs",
})
export class EnumToPairsPipe implements PipeTransform {
    public transform(obj: Object): [number, string][] {
        const pairs = _.toPairs(obj);
        const items = _.filter(pairs, pair => _.isInteger(pair[1]));
        return _.map(items, pair => [pair[1], pair[0]]);
    }
}
