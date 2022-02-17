export class CustomError extends Error {
    constructor(public customMessage: string) {
        super(customMessage);
    }
}
