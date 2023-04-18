export interface IFetchHook<T> {
    data: T,
    count: number | null
    status: number,
    message: string
}