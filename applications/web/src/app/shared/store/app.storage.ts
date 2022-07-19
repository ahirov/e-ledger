import { Injectable } from "@angular/core";
import { Vault } from "./app.model";

@Injectable({ providedIn: "root" })
export class AppStorage {
    public loadData(vault: Vault): any {
        const data = localStorage.getItem(vault);
        return data ? JSON.parse(data) : null;
    }

    public saveData(vault: Vault, data: any): void {
        localStorage.setItem(vault, JSON.stringify(data));
    }

    public clearData(vault: Vault): void {
        localStorage.removeItem(vault);
    }
}
