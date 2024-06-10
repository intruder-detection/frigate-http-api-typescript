/**
 * Interpolates the endpoint with path/query params.
 */
export function interpolateURLParams(endpoint: string, params: { [key: string]: any } = undefined) {
  if (!params) {
    return endpoint;
  }
  let res = String(endpoint);
  for (const [key, value] of Object.entries(params)) {
    res = res.replace(`<${key}>`, value as string);
  }

  return res;
}
