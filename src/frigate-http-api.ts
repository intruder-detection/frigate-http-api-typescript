import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../environment';
import { queryStringify } from './utils/querystring.utils';
import { FrigateApiEndpointsMapping } from './endpoints/endpoint-types.types';

export class FrigateHTTPAPI {
  static frigateAPIURL = `${environment.FRIGATE_HTTP_URL}/${environment.FRIGATE_API_PREFIX}`;

  static defaultRequestConfig: AxiosRequestConfig = {
    headers: {
      contentType: 'application/json',
    },
    timeout: environment.DEFAULT_TIMEOUT,
    transitional: { clarifyTimeoutError: true },
  };

  static getURL<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
  ) {
    return `${this.frigateAPIURL}/${endpoint}${queryParams ? `?${queryStringify(queryParams as any)}` : ''}`;
  }

  static async get<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
  ): Promise<FrigateApiEndpointsMapping[typeof endpoint]['response']> {
    try {
      const rxp = await axios.get<FrigateApiEndpointsMapping[typeof endpoint]['response']>(
        this.getURL(endpoint, queryParams),
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }

  static async post<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
    body?: FrigateApiEndpointsMapping[typeof endpoint]['response'],
  ): Promise<FrigateApiEndpointsMapping[typeof endpoint]['response']> {
    try {
      const rxp = await axios.post<FrigateApiEndpointsMapping[typeof endpoint]['response']>(
        this.getURL(endpoint, queryParams),
        body,
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }
}
