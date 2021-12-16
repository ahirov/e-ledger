import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
    name: "enumToPairs",
})
export class EnumToPairsPipe implements PipeTransform {
    public transform(obj: Object): [string, string][] {
        const pairs = _.toPairs(obj);
        return _.filter(pairs, pair => _.isString(pair[1]));
    }
}
