import { FrigateApiEndpointsMapping } from '../endpoints/endpoint-types.types';

/**
 * Interpolates the endpoint with path/query params.
 */
export function interpolateURLParams<E extends keyof FrigateApiEndpointsMapping>(
  endpoint: E,
  params: { [key: string]: string | number | boolean } = {},
) {
  let res = String(endpoint);
  for (const [key, value] of Object.entries(params)) {
    res = endpoint.replace(`<${key}>`, value as string);
  }

  return res;
}
