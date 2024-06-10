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
export const queryStringify = (
  source: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined>,
): string => {
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
};
