import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import {
    SortableComponent,
    SortableItem,
} from "applications/ngx-bootstrap/src/sortable/sortable.component";

import { AdjustmentService } from "../adjustment.service";
import { ISourceView, Source, SourceView } from "../model/income.model";
import { Category, CategoryView, ICategoryView } from "../model/outcome.model";
import { environment } from "applications/web/src/environments/environment";
import { selectors } from "../store/adjustment.selectors";
import * as fromActions from "../store/adjustment.actions";
import * as _ from "lodash";

@Component({
    selector: "el-enumeration",
    templateUrl: "./enumeration.component.html",
    styleUrls: ["./enumeration.component.scss"],
})
export class EnumerationsComponent implements OnInit, OnDestroy {
    private _sourcesSub!: Subscription;
    private _categoriesSub!: Subscription;

    @ViewChild("elSourceItems")
    private _sourceItems!: SortableComponent;
    @ViewChild("elCategoryItems")
    private _categoryItems!: SortableComponent;

    public sources: ISourceView[] = [];
    public categories: ICategoryView[] = [];
    public maxLength = environment.enumerationMaxLength;

    constructor(
        private _adjustmentService: AdjustmentService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this._sourcesSub = this._store$
            .select(selectors.viewSources)
            .subscribe(data => {
                this.sources = data;
            });
        this._categoriesSub = this._store$
            .select(selectors.viewCategories)
            .subscribe(data => {
                this.categories = data;
            });
    }

    public ngOnDestroy(): void {
        if (this._sourcesSub) {
            this._sourcesSub.unsubscribe();
        }
        if (this._categoriesSub) {
            this._categoriesSub.unsubscribe();
        }
    }

    public onAdd(item: NgModel): void {
        const rawValue = item.value;
        if (rawValue) {
            const value = rawValue.substring(0, this.maxLength);
            if (item.name === "source") {
                this.sources.push(
                    new SourceView(this.getId(this.sources), value, false),
                );
                this._sourceItems.writeValue(this.sources);
            }
            if (item.name === "category") {
                this.categories.push(
                    new CategoryView(this.getId(this.categories), value, false),
                );
                this._categoryItems.writeValue(this.categories);
            }
            item.reset();
        }
    }

    public onDelete(item: SortableItem, index: number): void {
        if (item.initData instanceof SourceView) {
            _.pullAt(this.sources, [index]);
            this._sourceItems.writeValue(this.sources);
        }
        if (item.initData instanceof CategoryView) {
            _.pullAt(this.categories, [index]);
            this._categoryItems.writeValue(this.categories);
        }
    }

    public onSave(): void {
        this._store$.dispatch(
            fromActions.saveEnums({
                payload: {
                    sources: _.map(
                        this.sources,
                        item => new Source(item.id, item.name),
                    ),
                    categories: _.map(
                        this.categories,
                        item => new Category(item.id, item.name),
                    ),
                },
            }),
        );
        this._adjustmentService.showSavedDialog();
    }

    public onCancel(): void {
        this._store$.dispatch(fromActions.refreshEnums());
    }

    private getId(items: ISourceView[] | ICategoryView[]): number {
        let id = 1;
        _(items)
            .sortBy(item => item.id)
            .forEach(item => {
                if (item.id > id) {
                    return false;
                }
                id++;
                return true;
            });
        return id;
    }
}
