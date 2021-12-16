export {};

declare global {
    interface Date {
        toDate(): Date;
    }
}

Date.prototype.toDate = function (): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};
