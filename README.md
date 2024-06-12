# Frigate HTTP API for Nodejs

This is a simple implementation of the Frigate HTTP API using Typescript. Each endpoint is strongly typed.

## Usage

Make sure you have the proper environment variables. The only mandatory env variable is the `FRIGATE_HTTP_URL` which
is the endpoint where your Frigate instance is located. Example:
```
FRIGATE_HTTP_URL=http://192.168.1.5:5000
```

This API client is easy to use.

Create a request (**GET**/**POST**/**PUT**/**DELETE**/**PATCH**)

```ts
const events = await FrigateHTTPAPI.get(Events.Events, undefined, {
  limit: 5,
});
```

You'll notice that the API is strongly typed and if you try to pass `url parameters`/`query parameters`/`body` that is
invalid for the specific request, you'll get an error.

For example, if you try:

```ts
const events = await FrigateHTTPAPI.get(
  Events.Events,
  { test:  }, // TS2345: Argument of type { test: any; } is not assignable to parameter of type undefined
  {
     limit: 5,
  },
);
```


Look at `./test/main.ts` for examples for pretty much all existing endpoints.
