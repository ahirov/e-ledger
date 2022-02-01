/*////////////////// TEMP CODE!!! //////////////////*/
interface ISource {
    name: string;
}

interface ICategory {
    name: string;
}

export class SourceType implements ISource {
    constructor(public name: string) {}
}

export class CategoryType implements ICategory {
    constructor(public name: string) {}
}
/*//////////////////////////////////////////////////*/
