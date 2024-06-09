/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpService {
    private instance: AxiosInstance;

    constructor({ withoutBaseUrl }: { withoutBaseUrl: boolean }) {
        this.instance = axios.create({
            baseURL: withoutBaseUrl ? '' : String(process.env.API_BASE_URL),
            timeout: 10000,
        });
    }

    get = (
        url: string,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<any, any>> => {
        return this.instance.get(url, configs);
    };

    post = (
        url: string,
        params: Record<string, unknown>,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<any, any>> => {
        return this.instance.post(url, params, configs);
    };

    put = (
        url: string,
        params: Record<string, unknown>,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<any, any>> => {
        return this.instance.put(url, params, configs);
    };

    delete = (
        url: string,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<any, any>> => {
        return this.instance.delete(url, configs);
    };
}

export const httpService = new HttpService({ withoutBaseUrl: true });
