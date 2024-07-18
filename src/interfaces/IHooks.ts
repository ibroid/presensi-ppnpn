export interface IFetchHook<T> {
    data: T,
    count: number | null
    status: number,
    message: string
}

export type ActivityModel = {
    doing: string;
    doing_time: string;
    note: string;
}