import axios, { AxiosRequestConfig, ResponseType } from 'axios';
import { environment } from '../environment';
import { queryStringify } from './utils/querystring.utils';
import { FrigateApiDeleteEndpointsMapping, FrigateApiGetEndpointsMapping, FrigateApiPostEndpointsMapping } from './endpoints/endpoint-types.types';
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

  static getURL(endpoint: string, urlParams?: { [key: string]: any }, queryParams?: { [key: string]: any }) {
    const endpointWithReplacedParams = interpolateURLParams(endpoint, urlParams);
    return `${this.frigateAPIURL}/${endpointWithReplacedParams}${queryParams ? `?${queryStringify(queryParams as any)}` : ''}`;
  }

  static async get<E extends keyof FrigateApiGetEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiGetEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiGetEndpointsMapping[typeof endpoint]['queryParams'],
    responseType?: ResponseType,
  ): Promise<FrigateApiGetEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams, queryParams);
    try {
      const rxp = await axios.get<FrigateApiGetEndpointsMapping[typeof endpoint]['response']>(
        url,
        responseType
          ? {
              ...this.defaultRequestConfig,
              responseType,
            }
          : this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. URL: ${url}. ${e}`);
    }
  }

  static async delete<E extends keyof FrigateApiDeleteEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiDeleteEndpointsMapping[typeof endpoint]['urlParams'],
  ): Promise<FrigateApiDeleteEndpointsMapping[typeof endpoint]['response']> {
    try {
      const rxp = await axios.delete<FrigateApiDeleteEndpointsMapping[typeof endpoint]['response']>(
        this.getURL(endpoint, urlParams),
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }

  static async post<E extends keyof FrigateApiPostEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiPostEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiPostEndpointsMapping[typeof endpoint]['queryParams'],
    body?: FrigateApiPostEndpointsMapping[typeof endpoint]['body'],
  ): Promise<FrigateApiPostEndpointsMapping[typeof endpoint]['response']> {
    try {
      const rxp = await axios.post<FrigateApiPostEndpointsMapping[typeof endpoint]['response']>(
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
