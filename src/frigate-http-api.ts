import axios, { AxiosRequestConfig, ResponseType } from 'axios';
import { environment } from '../environment';
import { queryStringify } from './utils/querystring.utils';
import { FrigateApiEndpointsMapping } from './endpoints/endpoint-types.types';
import { interpolateURLParams } from './utils/interpolate-url-params.utils';

export class FrigateHTTPAPI {
  static frigateAPIURL = `${environment.FRIGATE_HTTP_URL}/${environment.FRIGATE_API_PREFIX}`;

  static defaultRequestConfig: AxiosRequestConfig = {
    headers: {
      contentType: 'application/json',
    },
    timeout: environment.DEFAULT_TIMEOUT,
    transitional: { clarifyTimeoutError: true },
    responseType: 'json',
  };

  static getURL<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
  ) {
    const endpointWithReplacedParams = interpolateURLParams(endpoint, urlParams);
    return `${this.frigateAPIURL}/${endpointWithReplacedParams}${queryParams ? `?${queryStringify(queryParams as any)}` : ''}`;
  }

  static async get<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
    responseType?: ResponseType,
  ): Promise<FrigateApiEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams, queryParams);
    try {
      const rxp = await axios.get<FrigateApiEndpointsMapping[typeof endpoint]['response']>(
        url,
        responseType ? {
          ...this.defaultRequestConfig,
          responseType,
        } : this.defaultRequestConfig ,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. URL: ${url}. ${e}`);
    }
  }

  static async post<E extends keyof FrigateApiEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiEndpointsMapping[typeof endpoint]['queryParams'],
    body?: FrigateApiEndpointsMapping[typeof endpoint]['response'],
  ): Promise<FrigateApiEndpointsMapping[typeof endpoint]['response']> {
    try {
      const rxp = await axios.post<FrigateApiEndpointsMapping[typeof endpoint]['response']>(
        this.getURL(endpoint, urlParams, queryParams),
        body,
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }
}
