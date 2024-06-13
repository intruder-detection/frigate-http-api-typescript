# Frigate HTTP API for Nodejs

This is a simple implementation of the Frigate HTTP API using Typescript. Each endpoint is strongly typed.

## Install

You can install it in a Typescript project by doing the following:

```bash
npm i @intruder-detection/frigate-http-api-typescript
```

## Usage

```ts
import { FrigateHTTPAPI, Events } from '@intruder-detection/frigate-http-api-typescript';

// Set the required configuration
FrigateHTTPAPI.configuration = {
  frigateHTTPAPIURL: 'http://192.168.1.223:5000',
};
// Perform any Frigate HTTP API Request
const events = await FrigateHTTPAPI.get(Events.Events, undefined, {
  limit: 5,
});
```

Notice that the first thing we're doing is to set the required configuration. This is **mandatory**, since the client needs to know where the server is located. You can set it directly or load from environment variables (See last section for an example on how to load from environment variables using zod library to verify the input).

Afterward, the API client is easy to use.

Create requests (**GET**/**POST**/**PUT**/**DELETE**/**PATCH**) and use the response as you which to

```ts
const events = await FrigateHTTPAPI.get(Events.Events, undefined, { limit: 10 });
const eventsSummary = await FrigateHTTPAPI.get(Events.EventsSummary);
```

You'll notice that the response has a type if you hover over the events property you'll see: `const events: EventsResponse[]`

### Strong types

You'll also notice that the API is strongly typed. If you try to pass any `url parameters`/`query parameters`/`body` that is
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

## More examples

For more examples look into `./test/main.ts` file, which contains examples for pretty much all existing endpoints.

You can easily run this file using the npm script inside package.json 
```json
"debug": "dotenv -- npx tsx --inspect-brk test/main.ts",
```

The npm script loads the `.env` file to `process.env` and then inside the `main.ts` file we're doing

```ts
FrigateHTTPAPI.configuration = {
  defaultTimeout: zodEnvironmentParse.DEFAULT_TIMEOUT,
  frigateHTTPAPIURL: zodEnvironmentParse.FRIGATE_HTTP_URL,
};
```
`zodEnvironmentParse` is using the [zod library](https://zod.dev/)  to verify the correctness of the provided `.env` file. If the `FRIGATE_HTTP_URL` is not present in the `.env` file, then zod will throw an error.

If you prefer to load it directly from the `process.env`, then do:

```ts
FrigateHTTPAPI.configuration = {
  frigateHTTPAPIURL: process.env.FRIGATE_HTTP_URL!,
}
```
