import axios, { AxiosError, AxiosRequestConfig, ResponseType } from 'axios';
import {
  FrigateApiDeleteEndpointsMapping,
  FrigateApiGetEndpointsMapping,
  FrigateApiPatchEndpointsMapping,
  FrigateApiPostEndpointsMapping,
  FrigateApiPutEndpointsMapping,
} from './endpoints/endpoint-types.types';
import { interpolateURLParams } from './utils/interpolate-url-params.utils';
import { FrigateHttpApiConfiguration } from './config/frigate-http-api-configuration.interface';

export class FrigateHTTPAPI {
  // By default, this value is 'api', and there is no reason to change it at the moment
  static FRIGATE_API_PREFIX = 'api';
  private static apiConfiguration: FrigateHttpApiConfiguration;

  static get defaultRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        contentType: 'application/json',
      },
      timeout: this.defaultTimeout,
      transitional: { clarifyTimeoutError: true },
      responseType: 'json',
    };
  }

  static set configuration(config: FrigateHttpApiConfiguration) {
    this.apiConfiguration = config;
  }

  static get defaultTimeout(): number {
    this.throwIfConfigNotSet();
    return this.apiConfiguration.defaultTimeout || 5000;
  }

  static getFrigateAPIURL(endpoint: string) {
    this.throwIfConfigNotSet();
    return endpoint.endsWith('index.m3u8')
      ? // m3u8 endpoints are provided by ngix, and so, they don't have /api prefix
        this.apiConfiguration.frigateHTTPAPIURL
      : `${this.apiConfiguration.frigateHTTPAPIURL}/${this.FRIGATE_API_PREFIX}`;
  }

  static throwIfConfigNotSet() {
    if (!this.apiConfiguration) {
      throw new Error(
        `To use the Frigate HTTP API you need to set the configuration (e.g., HTTP API URL). Missing call to FrigateHTTPAPI.configuration?`,
      );
    }
  }

  static getURL<
    E extends keyof (FrigateApiGetEndpointsMapping &
      FrigateApiDeleteEndpointsMapping &
      FrigateApiPatchEndpointsMapping &
      FrigateApiPostEndpointsMapping &
      FrigateApiPutEndpointsMapping),
  >(
    endpoint: E,
    urlParams?: {
      [key: string]: any;
    },
    queryParams?: { [key: string]: any },
  ) {
    const endpointWithReplacedParams = interpolateURLParams(endpoint, urlParams);
    return `${this.getFrigateAPIURL(endpointWithReplacedParams)}/${endpointWithReplacedParams}${queryParams ? `?${this.queryStringify(queryParams as any)}` : ''}`;
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
      this.throwError(endpoint, url, e as AxiosError);
    }
  }

  static async delete<E extends keyof FrigateApiDeleteEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiDeleteEndpointsMapping[typeof endpoint]['urlParams'],
  ): Promise<FrigateApiDeleteEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams);
    try {
      const rxp = await axios.delete<FrigateApiDeleteEndpointsMapping[typeof endpoint]['response']>(url, this.defaultRequestConfig);
      return rxp.data;
    } catch (e: unknown) {
      this.throwError(endpoint, url, e as AxiosError);
    }
  }

  static async patch<E extends keyof FrigateApiPatchEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiPatchEndpointsMapping[typeof endpoint]['urlParams'],
  ): Promise<FrigateApiPatchEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams);
    try {
      const rxp = await axios.patch<FrigateApiPatchEndpointsMapping[typeof endpoint]['response']>(url, this.defaultRequestConfig);
      return rxp.data;
    } catch (e: unknown) {
      this.throwError(endpoint, url, e as AxiosError);
    }
  }

  static async post<E extends keyof FrigateApiPostEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiPostEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiPostEndpointsMapping[typeof endpoint]['queryParams'],
    body?: FrigateApiPostEndpointsMapping[typeof endpoint]['body'],
  ): Promise<FrigateApiPostEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams, queryParams);
    try {
      const rxp = await axios.post<FrigateApiPostEndpointsMapping[typeof endpoint]['response']>(url, body, this.defaultRequestConfig);
      return rxp.data;
    } catch (e: unknown) {
      this.throwError(endpoint, url, e as AxiosError);
    }
  }

  static async put<E extends keyof FrigateApiPutEndpointsMapping>(
    endpoint: E,
    urlParams?: FrigateApiPutEndpointsMapping[typeof endpoint]['urlParams'],
    queryParams?: FrigateApiPutEndpointsMapping[typeof endpoint]['queryParams'],
    body?: FrigateApiPutEndpointsMapping[typeof endpoint]['body'],
  ): Promise<FrigateApiPutEndpointsMapping[typeof endpoint]['response']> {
    const url = this.getURL(endpoint, urlParams, queryParams);
    try {
      const rxp = await axios.put<FrigateApiPutEndpointsMapping[typeof endpoint]['response']>(url, body, this.defaultRequestConfig);
      return rxp.data;
    } catch (e: unknown) {
      this.throwError(endpoint, url, e as AxiosError);
    }
  }

  static throwError(endpoint: string, url: string, e: AxiosError) {
    const errorMessage = (e.response?.data as { message: string }).message;
    throw new Error(`Failed to run command ${endpoint}. URL: ${url}. Status: ${e.response.status}. Error is: ${errorMessage}`);
  }

  /**
   * Converts a JavaScript object to a URL query string.
   * @example:
   *  queryStringify({ a: 1, b: 2 }) // returns 'a=1&b=2'
   *  queryStringify({ a: 1, b: [2, 3] }) // returns 'a=1&b=2&b=3'
   *  queryStringify({ a: 1, b: null }) // returns 'a=1'
   *  queryStringify({ a: 1, b: undefined }) // returns 'a=1'
   *  queryStringify({ a: 1, b: [null, undefined] }) // returns 'a=1'
   *  queryStringify({ a: 1, b: [2, null, 3, undefined] }) // returns 'a=1&b=2&b=3'
   * @param source - The object to convert.
   * @returns The URL query string.
   */
  private static queryStringify(
    source: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined>,
  ): string {
    const urlSearch = new URLSearchParams();

    Object.entries(source).forEach(([key, value]) => {
      // The behavior of query parameters without a value is actually not well-defined by the URL specification,
      // so we ignore it
      if (value === null || value === undefined) {
        return;
      }
      if (value instanceof Array) {
        for (const innerValue of value) {
          if (innerValue !== null && innerValue !== undefined) {
            urlSearch.append(key, innerValue.toString());
          }
        }
        return urlSearch;
      }
      return urlSearch.append(key, value.toString());
    });

    return urlSearch.toString();
  }
}
