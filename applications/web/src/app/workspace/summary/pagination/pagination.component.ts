import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Subscription } from "rxjs";

import * as _ from "lodash";

@Component({
    selector: "el-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnDestroy {
    private _activeItemSub!: Subscription;
    private _itemsCountSub!: Subscription;
    private _items: number[] = [];

    @Input()
    public activeItemSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;
    @Input()
    public itemsCountSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;
    @Input()
    public selectAction!: (props: { payload: number }) => {
        payload: number;
    } & TypedAction<any>;

    public activeItem = 0;
    public itemsCount = 0;
    public disabledItem = -1;

    public get items(): number[] {
        return this._items;
    }

    constructor(private _store$: Store) {}

    public ngOnInit(): void {
        this._activeItemSub = this._store$
            .select(this.activeItemSelector)
            .subscribe(data => {
                this.activeItem = data;
                this.calculateItems();
            });
        this._itemsCountSub = this._store$
            .select(this.itemsCountSelector)
            .subscribe(data => {
                this.itemsCount = data;
                this.calculateItems();
            });
    }

    public ngOnDestroy(): void {
        if (this._activeItemSub) {
            this._activeItemSub.unsubscribe();
        }
        if (this._itemsCountSub) {
            this._itemsCountSub.unsubscribe();
        }
    }

    public onSelect(item: number): void {
        this._store$.dispatch(this.selectAction({ payload: item }));
    }

    public onPrev(): void {
        this._store$.dispatch(
            this.selectAction({ payload: this.activeItem - 1 }),
        );
    }

    public onNext(): void {
        this._store$.dispatch(
            this.selectAction({ payload: this.activeItem + 1 }),
        );
    }

    private calculateItems(): void {
        const activeItem = this.activeItem;
        const allItems = _.range(this.itemsCount);
        const items: number[] = [];

        let currentItem = this.disabledItem;
        for (let item of allItems) {
            if (
                item === activeItem ||
                item === activeItem + 1 ||
                item === activeItem - 1 ||
                allItems.indexOf(item) === 0 ||
                allItems.indexOf(item) === allItems.length - 1
            ) {
                items.push(item);
                currentItem = item;
            } else {
                if (currentItem !== this.disabledItem) {
                    items.push(this.disabledItem);
                }
                currentItem = this.disabledItem;
            }
        }
        this._items = items;
    }
}
