import { Component, } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "el-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    animations: [
        trigger("authSignUpState", [
            transition("void => *", [
                style({
                    height: 0,
                    opacity: 0,
                    transform: "translateY(-46px)",
                }),
                animate(400),
            ]),
            transition("* => void", [
                animate(
                    400,
                    style({
                        height: 0,
                        opacity: 0,
                        transform: "translateY(-46px)",
                    })
                ),
            ]),
        ]),
    ],
})
export class AuthComponent {
    public isAuthSignUp = false;

    onAuthSignUpChange(event: Event) {
        const target = event?.target as any;
        if (target?.checked) {
            this.isAuthSignUp = true;
        } else {
            this.isAuthSignUp = false;
        }
    }
}
