import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
    name: "truncate",
})
export class TruncatePipe implements PipeTransform {
    transform(
        text: string | null,
        length: number = 20,
        omission: string = "...",
    ): string {
        if (text) {
            if (text.length > length) {
                return _.truncate(text, {
                    length: length,
                    separator: " ",
                    omission: omission,
                });
            }
            return text;
        }
        return "";
    }
}
