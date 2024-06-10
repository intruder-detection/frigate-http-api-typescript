import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../environment';
import { queryStringify } from './utils/querystring.utils';
import { FrigateHttpApiEndpoints } from './endpoints/frigate-http-api-endpoints';

export class FrigateHTTPAPI {
  static frigateAPIURL = `${environment.FRIGATE_HTTP_URL}/${environment.FRIGATE_API_PREFIX}`;

  static defaultRequestConfig: AxiosRequestConfig = {
    headers: {
      contentType: 'application/json',
    },
    timeout: environment.DEFAULT_TIMEOUT,
    transitional: { clarifyTimeoutError: true },
  }

  static async get<T>(endpoint: FrigateHttpApiEndpoints, queryParameters?: any): Promise<T> {
    try {
      const rxp = await axios.get<T>(
        `${this.frigateAPIURL}/${endpoint}${queryParameters ? `?${queryStringify(queryParameters)}` : ''}`,
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }

  static async post<T>(endpoint: FrigateHttpApiEndpoints): Promise<T> {
    try {
      const rxp = await axios.post<T>(
        `${this.frigateAPIURL}/${endpoint}`,
        undefined,
        this.defaultRequestConfig,
      );
      return rxp.data;
    } catch (e: unknown) {
      throw new Error(`Failed to run command ${endpoint}. ${e}`);
    }
  }
}
