export interface IAuthContext<T> {
    isLoading: boolean;
    token: string | null;
    user: T
}