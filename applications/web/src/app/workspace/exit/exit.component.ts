import { Component, OnDestroy, OnInit } from "@angular/core";
import { differenceInSeconds } from "date-fns";
import { interval, Subscription } from "rxjs";
import { AuthTimerService } from "../../auth/auth-timer.service";

@Component({
    templateUrl: "./exit.component.html",
    styleUrls: ["./exit.component.scss"],
})
export class ExitComponent implements OnInit, OnDestroy {
    private _interval: Subscription | null = null;
    private _time = 0;
    public minutes = 0;
    public seconds = 0;
    public status!: "saved" | "unsaved";

    constructor(private _timerService: AuthTimerService) {}

    public ngOnInit(): void {
        const expiration = this._timerService.expiration;
        if (expiration) {
            const now = new Date();
            if (expiration > now) {
                this._time = differenceInSeconds(expiration, now);
                this.processTime();
                this._interval = interval(1000).subscribe(() => {
                    if (this._time > 0) {
                        this._time--;
                        this.processTime();
                    } else {
                        this.clearInterval();
                    }
                });
            }
        }
        this.status = "saved";
    }

    public ngOnDestroy(): void {
        this.clearInterval();
    }

    private processTime(): void {
        this.minutes = Math.floor(this._time / 60);
        this.seconds = this._time - this.minutes * 60;
    }

    private clearInterval(): void {
        if (this._interval) {
            this._interval.unsubscribe();
            this._interval = null;
        }
    }
}
