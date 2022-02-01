import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import {
    SortableComponent,
    SortableItem,
} from "applications/ngx-bootstrap/src/sortable/sortable.component";
import { CategoryType, SourceType } from "../adjustment.model";
import * as _ from "lodash";

@Component({
    selector: "el-enumerations",
    templateUrl: "./enumerations.component.html",
    styleUrls: ["./enumerations.component.scss"],
})
export class EnumerationsComponent implements OnInit {
    @ViewChild("elSourceItems")
    private _sourceItems!: SortableComponent;
    @ViewChild("elCategoryItems")
    private _categoryItems!: SortableComponent;

    public sources: SourceType[] = [];
    public categories: CategoryType[] = [];

    public ngOnInit(): void {
        /*////////////////// TEMP CODE!!! //////////////////*/
        this.sources = [
            new SourceType("Job"),
            new SourceType("Deposit"),
            new SourceType("Stolen"),
            new SourceType("Business"),
            new SourceType("Job2"),
            new SourceType("Job3"),
            new SourceType("Job4"),
            new SourceType("Job5"),
            new SourceType("Robbery"),
        ];
        this.categories = [new CategoryType("Food"), new CategoryType("Sport")];
        /*//////////////////////////////////////////////////*/
    }

    public onAdd(item: NgModel): void {
        if (item.value) {
            if (item.name === "source") {
                this.sources.push(new SourceType(item.value));
                this._sourceItems.writeValue(this.sources);
            }
            if (item.name === "category") {
                this.categories.push(new CategoryType(item.value));
                this._categoryItems.writeValue(this.categories);
            }
            item.reset();
        }
    }

    public onDelete(item: SortableItem, index: number): void {
        if (item.initData instanceof SourceType) {
            _.pullAt(this.sources, [index]);
            this._sourceItems.writeValue(this.sources);
        }
        if (item.initData instanceof CategoryType) {
            _.pullAt(this.categories, [index]);
            this._categoryItems.writeValue(this.categories);
        }
    }
}
