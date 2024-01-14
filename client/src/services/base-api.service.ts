import { RequestOptions, httpService } from './http.service';


interface IGetAllOptions<T> {
    query: T;
    count: number;
}

export abstract class BaseApiService {
    constructor(protected readonly endpoint: string) { }
    get<T>(id: number): Promise<T> {
        return httpService.get<T>(`${this.endpoint}/${id}`);
    }

    getAll<T>(options: Record<string, string | number>): Promise<IGetAllOptions<T>> {
        const requestOptions: RequestOptions = {
            query: options
        }
        return httpService.get<IGetAllOptions<T>>(this.endpoint, requestOptions);
    }
    
    post<T>(body: T): Promise<T> {
        const requestOptions: RequestOptions = {
            body: body
        }
        return httpService.post<T>(this.endpoint, requestOptions);
    }
    
    put<T>(body: T): Promise<T> {
        const requestOptions: RequestOptions = {
            body: body
        }
        return httpService.put<T>(this.endpoint, requestOptions);
    }
    
    delete<T>(): Promise<T> {
        return httpService.delete<T>(this.endpoint);
    }
}