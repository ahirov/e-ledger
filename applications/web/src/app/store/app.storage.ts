import { Injectable } from "@angular/core";

export enum StorageKey {
    User = "USER",
}

@Injectable({ providedIn: "root" })
export class AppStorage {
    public loadData(key: StorageKey): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public saveData(key: StorageKey, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public clearData(key: StorageKey): void {
        localStorage.removeItem(key);
    }
}
