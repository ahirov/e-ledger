import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import {
    SortableComponent,
    SortableItem,
} from "applications/ngx-bootstrap/src/sortable/sortable.component";

import { ISource, Source } from "../model/income.model";
import { Category, ICategory } from "../model/outcome.model";
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

    public sources: ISource[] = [];
    public categories: ICategory[] = [];

    constructor(private _store$: Store) {}

    public ngOnInit(): void {
        this._sourcesSub = this._store$
            .select(selectors.sources)
            .subscribe(data => {
                this.sources = data;
            });
        this._categoriesSub = this._store$
            .select(selectors.categories)
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
        if (item.value) {
            if (item.name === "source") {
                this.sources.push(
                    new Source(this.getId(this.sources), item.value),
                );
                this._sourceItems.writeValue(this.sources);
            }
            if (item.name === "category") {
                this.categories.push(
                    new Category(this.getId(this.categories), item.value),
                );
                this._categoryItems.writeValue(this.categories);
            }
            item.reset();
        }
    }

    public onDelete(item: SortableItem, index: number): void {
        if (item.initData instanceof Source) {
            _.pullAt(this.sources, [index]);
            this._sourceItems.writeValue(this.sources);
        }
        if (item.initData instanceof Category) {
            _.pullAt(this.categories, [index]);
            this._categoryItems.writeValue(this.categories);
        }
    }

    public onSave(): void {
        this._store$.dispatch(
            fromActions.setSources({ payload: this.sources }),
        );
        this._store$.dispatch(
            fromActions.setCategories({ payload: this.categories }),
        );
    }

    public onCancel(): void {
        this._store$.dispatch(fromActions.refresh());
    }

    private getId(items: ISource[] | ICategory[]): number {
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
