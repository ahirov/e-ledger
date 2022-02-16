import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

@Pipe({
    name: "truncate",
})
export class TruncatePipe implements PipeTransform {
    transform(
        text: string | null,
        length: number = environment.truncateLength,
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
