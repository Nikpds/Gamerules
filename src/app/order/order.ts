export class Filter {
    sortOrder: boolean;
    sortField: string;
    search: string;
    searchField: string;
    results = 20;
    orderStatus: number[];
    constructor() {
        this.orderStatus = new Array<number>();
    }
}

export class FilteredData<T> {
    filters: Filter;
    data: Array<T>;
    constructor() {
        this.data = new Array<T>();
        this.filters = new Filter();
    }
}
