import { Component, OnInit } from "@angular/core";
import { SyncMode } from "../model/state.mode";

@Component({
    selector: "el-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.scss"],
})
export class SettingsComponent implements OnInit {
    public syncModes!: { id: number; name: string }[];

    public ngOnInit(): void {
        this.syncModes = [
            { id: SyncMode.Never, name: "never" },
            { id: SyncMode.OneMinute, name: "1 minute" },
            { id: SyncMode.FiveMinutes, name: "5 minutes" },
        ];
    }

    public onSubmit(): void {
        console.log("submitted!");
    }

    public onCancel(): void {
        console.log("canceled!");
    }
}
